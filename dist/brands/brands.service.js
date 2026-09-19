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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BrandsService = class BrandsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.brand.findMany({
            include: {
                _count: { select: { products: true } },
            },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const brand = await this.prisma.brand.findFirst({
            where: { OR: [{ id }, { slug: id }] },
            include: {
                _count: { select: { products: true } },
            },
        });
        if (!brand)
            throw new common_1.NotFoundException(`Brand '${id}' not found`);
        return brand;
    }
    async create(data) {
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const existing = await this.prisma.brand.findFirst({ where: { OR: [{ name: data.name }, { slug }] } });
        if (existing)
            throw new common_1.BadRequestException(`Brand '${data.name}' already exists`);
        return this.prisma.brand.create({
            data: {
                name: data.name,
                slug,
                image: data.image || null,
                description: data.description || null,
            },
        });
    }
    async update(id, data) {
        const existing = await this.prisma.brand.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Brand '${id}' not found`);
        return this.prisma.brand.update({
            where: { id },
            data: {
                name: data.name ?? existing.name,
                image: data.image ?? existing.image,
                description: data.description ?? existing.description,
                isActive: data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive,
            },
        });
    }
    async remove(id) {
        const existing = await this.prisma.brand.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Brand '${id}' not found`);
        await this.prisma.brand.delete({ where: { id } });
        return { success: true, message: `Brand '${existing.name}' deleted` };
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandsService);
//# sourceMappingURL=brands.service.js.map