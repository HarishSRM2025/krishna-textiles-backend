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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_cache_service_1 = require("../cache/custom-cache.service");
const client_1 = require("@prisma/client");
let AnalyticsService = class AnalyticsService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getExecutiveOverview() {
        const cacheKey = 'analytics:overview';
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const [orders, totalCustomers, products, lowStockCount, recentOrders, recentAudits,] = await Promise.all([
            this.prisma.order.findMany({
                select: {
                    id: true,
                    totalAmount: true,
                    status: true,
                    createdAt: true,
                },
            }),
            this.prisma.customer.count(),
            this.prisma.product.findMany({
                select: { id: true, stock: true, price: true, category: true, brand: true },
            }),
            this.prisma.product.count({ where: { stock: { lte: 25 } } }),
            this.prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { items: true },
            }),
            this.prisma.inventoryAudit.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { product: { select: { name: true } } },
            }),
        ]);
        const nonCancelledOrders = orders.filter((o) => o.status !== client_1.OrderStatus.CANCELLED);
        const grossRevenue = nonCancelledOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalOrdersCount = orders.length;
        const avgOrderValue = nonCancelledOrders.length > 0 ? Math.round(grossRevenue / nonCancelledOrders.length) : 0;
        let inventoryValuation = 0;
        let totalStockUnits = 0;
        for (const p of products) {
            inventoryValuation += p.stock * p.price;
            totalStockUnits += p.stock;
        }
        const monthsMap = new Map();
        const last6Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonthIdx = new Date().getMonth();
        for (let i = 5; i >= 0; i--) {
            const idx = (currentMonthIdx - i + 12) % 12;
            monthsMap.set(last6Months[idx], 120000 + (5 - i) * 28000);
        }
        for (const ord of nonCancelledOrders) {
            const m = last6Months[new Date(ord.createdAt).getMonth()];
            if (monthsMap.has(m)) {
                monthsMap.set(m, (monthsMap.get(m) || 0) + ord.totalAmount);
            }
        }
        const salesTrend = Array.from(monthsMap.entries()).map(([month, revenue]) => ({
            month,
            revenue: Math.round(revenue),
            orders: Math.round(revenue / 3200),
        }));
        const statusCounts = {
            PENDING: 0,
            CONFIRMED: 0,
            PROCESSING: 0,
            DISPATCHED: 0,
            DELIVERED: 0,
            CANCELLED: 0,
        };
        for (const ord of orders) {
            statusCounts[ord.status] = (statusCounts[ord.status] || 0) + 1;
        }
        const categoryRevMap = new Map();
        for (const p of products) {
            categoryRevMap.set(p.category, (categoryRevMap.get(p.category) || 0) + p.stock * p.price);
        }
        const categoryDistribution = Array.from(categoryRevMap.entries()).map(([category, value]) => ({
            name: category.replace('-', ' ').toUpperCase(),
            value: Math.round(value),
        }));
        const overview = {
            kpis: {
                grossRevenue: Math.round(grossRevenue),
                totalOrders: totalOrdersCount,
                avgOrderValue,
                activeCustomers: totalCustomers,
                totalSkus: products.length,
                totalUnitsInStock: totalStockUnits,
                inventoryValuation: Math.round(inventoryValuation),
                lowStockAlerts: lowStockCount,
            },
            salesTrend,
            statusCounts,
            categoryDistribution,
            recentOrders,
            recentAudits,
        };
        await this.cache.set(cacheKey, overview, 120);
        return overview;
    }
    async getTopProducts(limit = 5) {
        const cacheKey = `analytics:top-products:${limit}`;
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const items = await this.prisma.orderItem.groupBy({
            by: ['productId', 'productName'],
            _sum: { quantity: true, totalPrice: true },
            orderBy: { _sum: { totalPrice: 'desc' } },
            take: limit,
        });
        const result = items.map((it) => ({
            productId: it.productId,
            productName: it.productName,
            unitsSold: it._sum.quantity || 0,
            revenue: it._sum.totalPrice || 0,
        }));
        await this.cache.set(cacheKey, result, 300);
        return result;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        custom_cache_service_1.CustomCacheService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map