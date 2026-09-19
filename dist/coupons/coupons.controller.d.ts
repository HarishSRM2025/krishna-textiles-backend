import { CouponsService } from './coupons.service';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    findAll(query: any): Promise<{
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
    validate(body: {
        code: string;
        cartTotal: number;
    }): Promise<{
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
