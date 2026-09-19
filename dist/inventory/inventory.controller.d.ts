import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getSummary(): Promise<{
        success: boolean;
        data: any;
    }>;
    getLowStock(): Promise<{
        success: boolean;
        count: number;
        data: {
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
        }[];
    }>;
    getAudits(productId?: string, limit?: number): Promise<{
        success: boolean;
        count: number;
        data: ({
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
        })[];
    }>;
    adjust(body: any, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    bulkAdjust(body: {
        items: any[];
    }, req: any): Promise<{
        success: boolean;
        count: number;
        data: any[];
    }>;
}
