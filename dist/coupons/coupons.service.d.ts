import { PrismaService } from '../prisma/prisma.service';
import { CouponType } from '@prisma/client';
export declare class CouponsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query?: {
        search?: string;
        isActive?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.CouponType;
            isActive: boolean;
            value: number;
            code: string;
            minOrderAmount: number;
            maxDiscountAmount: number | null;
            usageLimit: number | null;
            usedCount: number;
            validFrom: Date;
            validUntil: Date | null;
            applicableCategories: string[];
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CouponType;
        isActive: boolean;
        value: number;
        code: string;
        minOrderAmount: number;
        maxDiscountAmount: number | null;
        usageLimit: number | null;
        usedCount: number;
        validFrom: Date;
        validUntil: Date | null;
        applicableCategories: string[];
    }>;
    validateCoupon(code: string, cartTotal: number): Promise<{
        valid: boolean;
        coupon: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.CouponType;
            isActive: boolean;
            value: number;
            code: string;
            minOrderAmount: number;
            maxDiscountAmount: number | null;
            usageLimit: number | null;
            usedCount: number;
            validFrom: Date;
            validUntil: Date | null;
            applicableCategories: string[];
        };
        discountAmount: number;
        finalTotal: number;
    }>;
    create(data: {
        code: string;
        description?: string;
        type?: CouponType;
        value: number;
        minOrderAmount?: number;
        maxDiscountAmount?: number;
        usageLimit?: number;
        validFrom?: string;
        validUntil?: string;
        applicableCategories?: string[];
        isActive?: boolean;
    }): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CouponType;
        isActive: boolean;
        value: number;
        code: string;
        minOrderAmount: number;
        maxDiscountAmount: number | null;
        usageLimit: number | null;
        usedCount: number;
        validFrom: Date;
        validUntil: Date | null;
        applicableCategories: string[];
    }>;
    update(id: string, data: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CouponType;
        isActive: boolean;
        value: number;
        code: string;
        minOrderAmount: number;
        maxDiscountAmount: number | null;
        usageLimit: number | null;
        usedCount: number;
        validFrom: Date;
        validUntil: Date | null;
        applicableCategories: string[];
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
