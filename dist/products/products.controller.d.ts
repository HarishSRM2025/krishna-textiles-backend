import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(category?: string, brandId?: string, categoryId?: string, brandRefId?: string, search?: string, minPrice?: number, maxPrice?: number, stockStatus?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: ({
            categoryRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
                sortOrder: number;
            };
            brandRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            brand: string;
            brandId: string;
            category: string;
            categoryId: string | null;
            brandRefId: string | null;
            price: number;
            mrp: number;
            discount: number;
            rating: number;
            reviews: number;
            imageUrl: string | null;
            images: string[];
            bestSeller: boolean;
            description: string | null;
            sizes: string[];
            stock: number;
            minStockAlert: number;
            sku: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getCategories(): Promise<{
        success: boolean;
        data: ({
            _count: {
                products: number;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            sortOrder: number;
        })[];
    }>;
    getBrands(): Promise<{
        success: boolean;
        data: ({
            _count: {
                products: number;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    create(body: any): Promise<{
        success: boolean;
        message: string;
        data: {
            categoryRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
                sortOrder: number;
            };
            brandRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            brand: string;
            brandId: string;
            category: string;
            categoryId: string | null;
            brandRefId: string | null;
            price: number;
            mrp: number;
            discount: number;
            rating: number;
            reviews: number;
            imageUrl: string | null;
            images: string[];
            bestSeller: boolean;
            description: string | null;
            sizes: string[];
            stock: number;
            minStockAlert: number;
            sku: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: {
            categoryRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
                sortOrder: number;
            };
            brandRef: {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            brand: string;
            brandId: string;
            category: string;
            categoryId: string | null;
            brandRefId: string | null;
            price: number;
            mrp: number;
            discount: number;
            rating: number;
            reviews: number;
            imageUrl: string | null;
            images: string[];
            bestSeller: boolean;
            description: string | null;
            sizes: string[];
            stock: number;
            minStockAlert: number;
            sku: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
