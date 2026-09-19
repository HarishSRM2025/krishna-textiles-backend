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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_cache_service_1 = require("../cache/custom-cache.service");
const client_1 = require("@prisma/client");
let CrmService = class CrmService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async findAll(params) {
        const where = {};
        if (params.type && params.type !== 'ALL') {
            where.type = params.type;
        }
        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { phone: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
                { company: { contains: params.search, mode: 'insensitive' } },
                { gstin: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        const orphanOrders = await this.prisma.order.findMany({
            where: { customerId: null },
        });
        for (const o of orphanOrders) {
            if (o.customerPhone) {
                let customer = await this.prisma.customer.findUnique({
                    where: { phone: o.customerPhone },
                });
                if (!customer) {
                    customer = await this.prisma.customer.create({
                        data: {
                            name: o.customerName || 'Customer',
                            phone: o.customerPhone,
                            email: o.customerEmail || null,
                            address: o.shippingAddress || null,
                            type: 'RETAIL',
                        },
                    });
                }
                await this.prisma.order.update({
                    where: { id: o.id },
                    data: { customerId: customer.id },
                });
            }
        }
        const customers = await this.prisma.customer.findMany({
            where,
            include: {
                _count: { select: { orders: true, notes: true } },
                orders: {
                    select: { totalAmount: true, createdAt: true, status: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return customers.map((c) => {
            const deliveredOrders = c.orders.filter((o) => o.status !== 'CANCELLED');
            const totalSpent = deliveredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
            const avgOrderValue = deliveredOrders.length > 0 ? Math.round(totalSpent / deliveredOrders.length) : 0;
            const lastOrder = c.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
            return {
                id: c.id,
                name: c.name,
                email: c.email,
                phone: c.phone,
                company: c.company,
                gstin: c.gstin,
                address: c.address,
                city: c.city,
                state: c.state,
                pincode: c.pincode,
                type: c.type,
                creditLimit: c.creditLimit,
                totalOrders: c._count.orders,
                orderCount: c._count.orders,
                totalSpent,
                totalSpend: totalSpent,
                avgOrderValue,
                lastOrderDate: lastOrder ? lastOrder.createdAt : null,
                createdAt: c.createdAt,
            };
        });
    }
    async findOne(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                notes: { orderBy: { createdAt: 'desc' } },
                orders: {
                    orderBy: { createdAt: 'desc' },
                    include: { items: true },
                },
            },
        });
        if (!customer)
            throw new common_1.NotFoundException(`Customer '${id}' not found`);
        const validOrders = customer.orders.filter((o) => o.status !== 'CANCELLED');
        const totalSpent = validOrders.reduce((acc, o) => acc + o.totalAmount, 0);
        return {
            ...customer,
            metrics: {
                totalOrders: customer.orders.length,
                totalSpent,
                avgOrderValue: validOrders.length > 0 ? Math.round(totalSpent / validOrders.length) : 0,
            },
        };
    }
    async create(data) {
        const existing = await this.prisma.customer.findUnique({
            where: { phone: data.phone },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Customer with phone '${data.phone}' already exists.`);
        }
        const customer = await this.prisma.customer.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email || null,
                company: data.company || null,
                gstin: data.gstin || null,
                address: data.address || null,
                city: data.city || null,
                state: data.state || null,
                pincode: data.pincode || null,
                type: data.type || client_1.CustomerType.RETAIL,
                creditLimit: Number(data.creditLimit) || 0,
                notes: data.initialNote
                    ? {
                        create: {
                            note: data.initialNote,
                            author: 'Admin',
                        },
                    }
                    : undefined,
            },
        });
        await this.cache.invalidatePrefix('analytics:');
        return customer;
    }
    async update(id, data) {
        const existing = await this.prisma.customer.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Customer '${id}' not found`);
        return this.prisma.customer.update({
            where: { id },
            data: {
                ...data,
                creditLimit: data.creditLimit !== undefined ? Number(data.creditLimit) : undefined,
            },
        });
    }
    async addNote(customerId, note, author = 'Admin') {
        const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
        if (!customer)
            throw new common_1.NotFoundException(`Customer '${customerId}' not found`);
        return this.prisma.customerNote.create({
            data: {
                customerId,
                note,
                author,
            },
        });
    }
    async getCrmStats() {
        const [total, wholesaleCount, vipCount, retailCount] = await Promise.all([
            this.prisma.customer.count(),
            this.prisma.customer.count({ where: { type: client_1.CustomerType.WHOLESALE } }),
            this.prisma.customer.count({ where: { type: client_1.CustomerType.VIP } }),
            this.prisma.customer.count({ where: { type: client_1.CustomerType.RETAIL } }),
        ]);
        return {
            totalCustomers: total,
            wholesaleClients: wholesaleCount,
            vipClients: vipCount,
            retailCustomers: retailCount,
        };
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        custom_cache_service_1.CustomCacheService])
], CrmService);
//# sourceMappingURL=crm.service.js.map