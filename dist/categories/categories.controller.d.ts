import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<({
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        isActive: boolean;
        image: string | null;
        sortOrder: number;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        isActive: boolean;
        image: string | null;
        sortOrder: number;
    }>;
    create(body: {
        name: string;
        image?: string;
        description?: string;
        sortOrder?: number;
    }): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        isActive: boolean;
        image: string | null;
        sortOrder: number;
    }>;
    update(id: string, body: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        isActive: boolean;
        image: string | null;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
