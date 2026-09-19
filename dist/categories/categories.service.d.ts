import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    create(data: {
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
    update(id: string, data: any): Promise<{
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
