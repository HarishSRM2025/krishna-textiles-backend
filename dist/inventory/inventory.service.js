"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_cache_service_1 = require("../cache/custom-cache.service");
let InventoryService = class InventoryService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getInventorySummary() {
        const cacheKey = 'inventory:summary';
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
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
            }
            else if (p.stock <= p.minStockAlert) {
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
    async adjustStock(params) {
        const product = await this.prisma.product.findUnique({
            where: { id: params.productId },
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with ID '${params.productId}' not found`);
        const previousStock = product.stock;
        const newStock = previousStock + params.delta;
        if (newStock < 0) {
            throw new common_1.BadRequestException(`Cannot reduce stock by ${Math.abs(params.delta)}. Current stock is only ${previousStock}.`);
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
        await this.cache.invalidatePrefix('inventory:');
        await this.cache.invalidatePrefix('products:');
        await this.cache.invalidatePrefix('analytics:');
        return {
            product: updatedProduct,
            audit,
        };
    }
    async getAuditLogs(productId, limit = 50) {
        const where = {};
        if (productId)
            where.productId = productId;
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
    async bulkAdjust(adjustments) {
        const results = [];
        for (const adj of adjustments) {
            const res = await this.adjustStock(adj);
            results.push(res);
        }
        return results;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        custom_cache_service_1.CustomCacheService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map