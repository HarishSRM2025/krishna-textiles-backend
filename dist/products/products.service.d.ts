import { PrismaService } from '../prisma/prisma.service';
import { CustomCacheService } from '../cache/custom-cache.service';
export declare class ProductsService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CustomCacheService);
    findAll(params: {
        category?: string;
        brandId?: string;
        categoryId?: string;
        brandRefId?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        stockStatus?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        products: ({
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
    findOne(id: string): Promise<any>;
    getCategories(): Promise<({
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
    })[]>;
    getBrands(): Promise<({
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
    })[]>;
    create(data: {
        name: string;
        brand?: string;
        brandId?: string;
        brandRefId?: string;
        category: string;
        categoryId?: string;
        price: number;
        mrp: number;
        discount?: number;
        sizes?: string[];
        stock?: number;
        minStockAlert?: number;
        description?: string;
        sku?: string;
        imageUrl?: string;
        images?: string[];
        bestSeller?: boolean;
    }): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
