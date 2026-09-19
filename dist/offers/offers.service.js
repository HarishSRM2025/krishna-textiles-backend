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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OffersService = class OffersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query?.isActive !== undefined && query.isActive !== '') {
            where.isActive = query.isActive === 'true';
        }
        if (query?.targetType) {
            where.targetType = query.targetType;
        }
        return this.prisma.offer.findMany({
            where,
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(id) {
        const offer = await this.prisma.offer.findUnique({ where: { id } });
        if (!offer)
            throw new common_1.NotFoundException(`Offer '${id}' not found`);
        return offer;
    }
    async create(data) {
        return this.prisma.offer.create({
            data: {
                title: data.title,
                description: data.description || null,
                bannerImage: data.bannerImage || null,
                discountType: data.discountType || client_1.CouponType.PERCENTAGE,
                discountValue: Number(data.discountValue) || 0,
                targetType: data.targetType || client_1.OfferTarget.ALL,
                targetId: data.targetId || null,
                targetName: data.targetName || null,
                startDate: data.startDate ? new Date(data.startDate) : new Date(),
                endDate: data.endDate ? new Date(data.endDate) : null,
                priority: data.priority !== undefined ? Number(data.priority) : 0,
                badgeText: data.badgeText || null,
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
            },
        });
    }
    async update(id, data) {
        const existing = await this.prisma.offer.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Offer '${id}' not found`);
        return this.prisma.offer.update({
            where: { id },
            data: {
                title: data.title ?? existing.title,
                description: data.description ?? existing.description,
                bannerImage: data.bannerImage ?? existing.bannerImage,
                discountType: data.discountType ?? existing.discountType,
                discountValue: data.discountValue !== undefined ? Number(data.discountValue) : existing.discountValue,
                targetType: data.targetType ?? existing.targetType,
                targetId: data.targetId ?? existing.targetId,
                targetName: data.targetName ?? existing.targetName,
                startDate: data.startDate ? new Date(data.startDate) : existing.startDate,
                endDate: data.endDate !== undefined ? (data.endDate ? new Date(data.endDate) : null) : existing.endDate,
                priority: data.priority !== undefined ? Number(data.priority) : existing.priority,
                badgeText: data.badgeText ?? existing.badgeText,
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive,
            },
        });
    }
    async remove(id) {
        const existing = await this.prisma.offer.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Offer '${id}' not found`);
        await this.prisma.offer.delete({ where: { id } });
        return { success: true, message: `Offer '${existing.title}' deleted` };
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OffersService);
//# sourceMappingURL=offers.service.js.map