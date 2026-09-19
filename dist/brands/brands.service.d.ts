import { PrismaService } from '../prisma/prisma.service';
export declare class BrandsService {
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
    create(data: {
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
    update(id: string, data: any): Promise<{
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
