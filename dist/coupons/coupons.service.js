"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CouponsService = class CouponsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query?.search) {
            where.OR = [
                { code: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query?.isActive !== undefined && query.isActive !== '') {
            where.isActive = query.isActive === 'true';
        }
        const [coupons, total] = await Promise.all([
            this.prisma.coupon.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.coupon.count({ where }),
        ]);
        return {
            data: coupons,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const coupon = await this.prisma.coupon.findUnique({ where: { id } });
        if (!coupon)
            throw new common_1.NotFoundException(`Coupon '${id}' not found`);
        return coupon;
    }
    async validateCoupon(code, cartTotal) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code: code.toUpperCase() },
        });
        if (!coupon || !coupon.isActive) {
            throw new common_1.BadRequestException('Coupon is invalid or inactive');
        }
        const now = new Date();
        if (coupon.validFrom && now < coupon.validFrom) {
            throw new common_1.BadRequestException('Coupon has not started yet');
        }
        if (coupon.validUntil && now > coupon.validUntil) {
            throw new common_1.BadRequestException('Coupon has expired');
        }
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            throw new common_1.BadRequestException('Coupon usage limit reached');
        }
        if (cartTotal < coupon.minOrderAmount) {
            throw new common_1.BadRequestException(`Minimum order value of ₹${coupon.minOrderAmount} required`);
        }
        let discountAmount = 0;
        if (coupon.type === client_1.CouponType.PERCENTAGE) {
            discountAmount = (cartTotal * coupon.value) / 100;
            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
                discountAmount = coupon.maxDiscountAmount;
            }
        }
        else {
            discountAmount = Math.min(coupon.value, cartTotal);
        }
        return {
            valid: true,
            coupon,
            discountAmount: Math.round(discountAmount * 100) / 100,
            finalTotal: Math.max(0, cartTotal - discountAmount),
        };
    }
    async create(data) {
        const code = data.code.trim().toUpperCase();
        const existing = await this.prisma.coupon.findUnique({ where: { code } });
        if (existing)
            throw new common_1.BadRequestException(`Coupon code '${code}' already exists`);
        return this.prisma.coupon.create({
            data: {
                code,
                description: data.description || null,
                type: data.type || client_1.CouponType.PERCENTAGE,
                value: Number(data.value),
                minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : 0,
                maxDiscountAmount: data.maxDiscountAmount ? Number(data.maxDiscountAmount) : null,
                usageLimit: data.usageLimit ? Number(data.usageLimit) : null,
                validFrom: data.validFrom ? new Date(data.validFrom) : new Date(),
                validUntil: data.validUntil ? new Date(data.validUntil) : null,
                applicableCategories: data.applicableCategories || [],
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
            },
        });
    }
    async update(id, data) {
        const existing = await this.prisma.coupon.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Coupon '${id}' not found`);
        return this.prisma.coupon.update({
            where: { id },
            data: {
                code: data.code ? data.code.trim().toUpperCase() : existing.code,
                description: data.description ?? existing.description,
                type: data.type ?? existing.type,
                value: data.value !== undefined ? Number(data.value) : existing.value,
                minOrderAmount: data.minOrderAmount !== undefined ? Number(data.minOrderAmount) : existing.minOrderAmount,
                maxDiscountAmount: data.maxDiscountAmount !== undefined ? (data.maxDiscountAmount ? Number(data.maxDiscountAmount) : null) : existing.maxDiscountAmount,
                usageLimit: data.usageLimit !== undefined ? (data.usageLimit ? Number(data.usageLimit) : null) : existing.usageLimit,
                validFrom: data.validFrom !== undefined ? (data.validFrom ? new Date(data.validFrom) : new Date()) : existing.validFrom,
                validUntil: data.validUntil !== undefined ? (data.validUntil ? new Date(data.validUntil) : null) : existing.validUntil,
                applicableCategories: data.applicableCategories ?? existing.applicableCategories,
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive,
            },
        });
    }
    async remove(id) {
        const existing = await this.prisma.coupon.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Coupon '${id}' not found`);
        await this.prisma.coupon.delete({ where: { id } });
        return { success: true, message: `Coupon '${existing.code}' deleted` };
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map