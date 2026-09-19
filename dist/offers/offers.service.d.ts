import { PrismaService } from '../prisma/prisma.service';
import { OfferTarget, CouponType } from '@prisma/client';
export declare class OffersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query?: {
        isActive?: string;
        targetType?: OfferTarget;
    }): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        bannerImage: string | null;
        discountType: import(".prisma/client").$Enums.CouponType;
        discountValue: number;
        targetType: import(".prisma/client").$Enums.OfferTarget;
        targetId: string | null;
        targetName: string | null;
        startDate: Date;
        endDate: Date | null;
        priority: number;
        badgeText: string | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        bannerImage: string | null;
        discountType: import(".prisma/client").$Enums.CouponType;
        discountValue: number;
        targetType: import(".prisma/client").$Enums.OfferTarget;
        targetId: string | null;
        targetName: string | null;
        startDate: Date;
        endDate: Date | null;
        priority: number;
        badgeText: string | null;
    }>;
    create(data: {
        title: string;
        description?: string;
        bannerImage?: string;
        discountType?: CouponType;
        discountValue: number;
        targetType?: OfferTarget;
        targetId?: string;
        targetName?: string;
        startDate?: string;
        endDate?: string;
        priority?: number;
        badgeText?: string;
        isActive?: boolean;
    }): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        bannerImage: string | null;
        discountType: import(".prisma/client").$Enums.CouponType;
        discountValue: number;
        targetType: import(".prisma/client").$Enums.OfferTarget;
        targetId: string | null;
        targetName: string | null;
        startDate: Date;
        endDate: Date | null;
        priority: number;
        badgeText: string | null;
    }>;
    update(id: string, data: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        bannerImage: string | null;
        discountType: import(".prisma/client").$Enums.CouponType;
        discountValue: number;
        targetType: import(".prisma/client").$Enums.OfferTarget;
        targetId: string | null;
        targetName: string | null;
        startDate: Date;
        endDate: Date | null;
        priority: number;
        badgeText: string | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
