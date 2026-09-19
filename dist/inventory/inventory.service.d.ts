import { PrismaService } from '../prisma/prisma.service';
import { CustomCacheService } from '../cache/custom-cache.service';
export declare class InventoryService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CustomCacheService);
    getInventorySummary(): Promise<any>;
    getLowStockAlerts(): Promise<{
        category: string;
        brand: string;
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        categoryId: string | null;
        brandRefId: string | null;
        brandId: string;
        sku: string;
        price: number;
        mrp: number;
        discount: number;
        rating: number;
        reviews: number;
        imageUrl: string | null;
        images: string[];
        bestSeller: boolean;
        sizes: string[];
        stock: number;
        minStockAlert: number;
        isActive: boolean;
    }[]>;
    adjustStock(params: {
        productId: string;
        delta: number;
        reason: string;
        note?: string;
        createdBy?: string;
    }): Promise<{
        product: {
            category: string;
            brand: string;
            description: string | null;
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            slug: string;
            categoryId: string | null;
            brandRefId: string | null;
            brandId: string;
            sku: string;
            price: number;
            mrp: number;
            discount: number;
            rating: number;
            reviews: number;
            imageUrl: string | null;
            images: string[];
            bestSeller: boolean;
            sizes: string[];
            stock: number;
            minStockAlert: number;
            isActive: boolean;
        };
        audit: {
            id: string;
            createdAt: Date;
            productId: string;
            previousStock: number;
            newStock: number;
            delta: number;
            reason: string;
            note: string | null;
            createdBy: string | null;
        };
    }>;
    getAuditLogs(productId?: string, limit?: number): Promise<({
        product: {
            brand: string;
            id: string;
            name: string;
            sku: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        previousStock: number;
        newStock: number;
        delta: number;
        reason: string;
        note: string | null;
        createdBy: string | null;
    })[]>;
    bulkAdjust(adjustments: Array<{
        productId: string;
        delta: number;
        reason: string;
        note?: string;
        createdBy?: string;
    }>): Promise<any[]>;
}
