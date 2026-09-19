import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomCacheService } from '../cache/custom-cache.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CustomCacheService,
  ) {}

  async getInventorySummary() {
    const cacheKey = 'inventory:summary';
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        stock: true,
        minStockAlert: true,
        price: true,
      },
    });

    let totalUnits = 0;
    let totalValuation = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    for (const p of products) {
      totalUnits += p.stock;
      totalValuation += p.stock * p.price;
      if (p.stock <= 0) {
        outOfStockCount++;
      } else if (p.stock <= p.minStockAlert) {
        lowStockCount++;
      }
    }

    const summary = {
      totalSkus: products.length,
      totalUnits,
      totalValuation: Math.round(totalValuation),
      lowStockCount,
      outOfStockCount,
      inStockCount: products.length - lowStockCount - outOfStockCount,
    };

    await this.cache.set(cacheKey, summary, 120);
    return summary;
  }

  async getLowStockAlerts() {
    return this.prisma.product.findMany({
      where: {
        stock: { lte: 25 },
      },
      orderBy: { stock: 'asc' },
    });
  }

  async adjustStock(params: {
    productId: string;
    delta: number;
    reason: string;
    note?: string;
    createdBy?: string;
  }) {
    const product = await this.prisma.product.findUnique({
      where: { id: params.productId },
    });

    if (!product) throw new NotFoundException(`Product with ID '${params.productId}' not found`);

    const previousStock = product.stock;
    const newStock = previousStock + params.delta;

    if (newStock < 0) {
      throw new BadRequestException(
        `Cannot reduce stock by ${Math.abs(params.delta)}. Current stock is only ${previousStock}.`,
      );
    }

    const [updatedProduct, audit] = await this.prisma.$transaction([
      this.prisma.product.update({
        where: { id: params.productId },
        data: { stock: newStock },
      }),
      this.prisma.inventoryAudit.create({
        data: {
          productId: params.productId,
          previousStock,
          newStock,
          delta: params.delta,
          reason: params.reason,
          note: params.note || null,
          createdBy: params.createdBy || 'Admin',
        },
      }),
    ]);

    // Invalidate caches
    await this.cache.invalidatePrefix('inventory:');
    await this.cache.invalidatePrefix('products:');
    await this.cache.invalidatePrefix('analytics:');

    return {
      product: updatedProduct,
      audit,
    };
  }

  async getAuditLogs(productId?: string, limit = 50) {
    const where: any = {};
    if (productId) where.productId = productId;

    return this.prisma.inventoryAudit.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            brand: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async bulkAdjust(
    adjustments: Array<{
      productId: string;
      delta: number;
      reason: string;
      note?: string;
      createdBy?: string;
    }>,
  ) {
    const results = [];
    for (const adj of adjustments) {
      const res = await this.adjustStock(adj);
      results.push(res);
    }
    return results;
  }
}
