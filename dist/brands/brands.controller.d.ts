import { BrandsService } from './brands.service';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
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
    }>;
    create(body: {
        name: string;
        image?: string;
        description?: string;
    }): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        slug: string;
        isActive: boolean;
        image: string | null;
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
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
