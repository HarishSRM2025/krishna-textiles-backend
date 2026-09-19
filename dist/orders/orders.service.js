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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_cache_service_1 = require("../cache/custom-cache.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async onModuleInit() {
        await this.syncOrphanOrdersToCustomers();
    }
    async syncOrphanOrdersToCustomers() {
        try {
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
        }
        catch (err) {
            console.error('Error syncing orphan orders to customers:', err);
        }
    }
    async findAll(params) {
        const page = params.page ? Number(params.page) : 1;
        const limit = params.limit ? Number(params.limit) : 15;
        const skip = (page - 1) * limit;
        const where = {};
        if (params.status && params.status !== 'ALL') {
            if (params.status === 'CONFIRMED' || params.status === 'PENDING') {
                where.status = { in: ['CONFIRMED', 'PENDING'] };
            }
            else {
                where.status = params.status;
            }
        }
        if (params.customerId) {
            where.customerId = params.customerId;
        }
        if (params.search) {
            where.OR = [
                { orderNumber: { contains: params.search, mode: 'insensitive' } },
                { customerName: { contains: params.search, mode: 'insensitive' } },
                { customerPhone: { contains: params.search, mode: 'insensitive' } },
                { customerEmail: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        const [total, orders] = await Promise.all([
            this.prisma.order.count({ where }),
            this.prisma.order.findMany({
                where,
                include: {
                    items: true,
                    customer: true,
                    history: {
                        orderBy: { createdAt: 'desc' },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);
        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            orders,
        };
    }
    async findOne(id) {
        const order = await this.prisma.order.findFirst({
            where: {
                OR: [{ id }, { orderNumber: id }],
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                customer: true,
                history: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order '${id}' not found`);
        return order;
    }
    async getOrderHistory(id) {
        const order = await this.findOne(id);
        return this.prisma.orderStatusHistory.findMany({
            where: { orderId: order.id },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        if (!data.items || data.items.length === 0) {
            throw new common_1.BadRequestException('An order must contain at least one item.');
        }
        let customerId = data.customerId || null;
        if (!customerId && data.customerPhone) {
            let customer = await this.prisma.customer.findUnique({
                where: { phone: data.customerPhone },
            });
            if (!customer) {
                customer = await this.prisma.customer.create({
                    data: {
                        name: data.customerName || 'Customer',
                        phone: data.customerPhone,
                        email: data.customerEmail || null,
                        address: data.shippingAddress || null,
                        type: 'RETAIL',
                    },
                });
            }
            customerId = customer.id;
        }
        const orderNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
        let subtotal = 0;
        const lineItems = data.items.map((item) => {
            const lineTotal = item.quantity * item.unitPrice;
            subtotal += lineTotal;
            return {
                productId: item.productId,
                productName: item.productName,
                size: item.size || 'Standard',
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
                totalPrice: lineTotal,
            };
        });
        const taxAmount = Math.round(subtotal * 0.05);
        const discountAmount = 0;
        const totalAmount = subtotal + taxAmount - discountAmount;
        const order = await this.prisma.order.create({
            data: {
                orderNumber,
                customerId,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                customerEmail: data.customerEmail || null,
                shippingAddress: data.shippingAddress,
                paymentMethod: data.paymentMethod || 'ONLINE_GPAY',
                paymentStatus: client_1.PaymentStatus.PAID,
                status: client_1.OrderStatus.CONFIRMED,
                subtotal,
                taxAmount,
                discountAmount,
                totalAmount,
                notes: data.notes || null,
                items: {
                    create: lineItems,
                },
                history: {
                    create: {
                        status: client_1.OrderStatus.CONFIRMED,
                        note: 'Order placed & payment verified. Awaiting dispatch.',
                        changedBy: 'System',
                    },
                },
            },
            include: { items: true, customer: true, history: true },
        });
        for (const item of data.items) {
            if (item.productId) {
                const prod = await this.prisma.product.findUnique({ where: { id: item.productId } });
                if (prod) {
                    const newStock = Math.max(0, prod.stock - item.quantity);
                    await this.prisma.product.update({
                        where: { id: prod.id },
                        data: { stock: newStock },
                    });
                    await this.prisma.inventoryAudit.create({
                        data: {
                            productId: prod.id,
                            previousStock: prod.stock,
                            newStock,
                            delta: -item.quantity,
                            reason: 'Sale',
                            note: `Order #${orderNumber} confirmation deduction.`,
                            createdBy: 'Order Engine',
                        },
                    });
                }
            }
        }
        await this.cache.invalidatePrefix('analytics:');
        await this.cache.invalidatePrefix('inventory:');
        await this.cache.invalidatePrefix('products:');
        await this.cache.invalidatePrefix('crm:');
        return order;
    }
    async updateStatus(id, status, trackingNumber, note, courierPartner, dispatchedAt, expectedDeliveryDate) {
        const order = await this.prisma.order.findFirst({
            where: { OR: [{ id }, { orderNumber: id }] },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order '${id}' not found`);
        const validFulfillmentStatuses = [
            client_1.OrderStatus.CONFIRMED,
            client_1.OrderStatus.PROCESSING,
            client_1.OrderStatus.PENDING,
            client_1.OrderStatus.DISPATCHED,
            client_1.OrderStatus.DELIVERED,
            client_1.OrderStatus.CANCELLED,
        ];
        if (!validFulfillmentStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid fulfillment status: ${status}. Supported stages: Dispatch Pending, Processing, Shipped, Delivered, Cancelled.`);
        }
        if (status === client_1.OrderStatus.CANCELLED && order.status !== client_1.OrderStatus.CANCELLED) {
            for (const item of order.items) {
                if (item.productId) {
                    const prod = await this.prisma.product.findUnique({ where: { id: item.productId } });
                    if (prod) {
                        const newStock = prod.stock + item.quantity;
                        await this.prisma.product.update({
                            where: { id: prod.id },
                            data: { stock: newStock },
                        });
                        await this.prisma.inventoryAudit.create({
                            data: {
                                productId: prod.id,
                                previousStock: prod.stock,
                                newStock,
                                delta: item.quantity,
                                reason: 'Cancellation Restock',
                                note: `Order #${order.orderNumber} cancelled. Stock restored.`,
                                createdBy: 'Admin Order Engine',
                            },
                        });
                    }
                }
            }
        }
        const updateData = { status };
        if (trackingNumber !== undefined) {
            updateData.trackingNumber = trackingNumber;
        }
        if (courierPartner !== undefined) {
            updateData.courierPartner = courierPartner;
        }
        if (status === client_1.OrderStatus.DISPATCHED) {
            const defaultExpDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
            const expDate = expectedDeliveryDate || (order.expectedDeliveryDate ? order.expectedDeliveryDate.toISOString() : defaultExpDate);
            updateData.expectedDeliveryDate = new Date(expDate);
            updateData.dispatchedAt = dispatchedAt ? new Date(dispatchedAt) : (order.dispatchedAt || new Date());
        }
        else if (expectedDeliveryDate !== undefined) {
            updateData.expectedDeliveryDate = expectedDeliveryDate ? new Date(expectedDeliveryDate) : null;
        }
        if (dispatchedAt !== undefined && status !== client_1.OrderStatus.DISPATCHED) {
            updateData.dispatchedAt = dispatchedAt ? new Date(dispatchedAt) : null;
        }
        if (status === client_1.OrderStatus.DELIVERED) {
            updateData.paymentStatus = client_1.PaymentStatus.PAID;
        }
        const updated = await this.prisma.order.update({
            where: { id: order.id },
            data: updateData,
            include: { items: true, customer: true, history: true },
        });
        let historyNote = note;
        if (!historyNote) {
            const details = [];
            if (courierPartner || updated.courierPartner)
                details.push(`Courier: ${courierPartner || updated.courierPartner}`);
            if (trackingNumber || updated.trackingNumber)
                details.push(`AWB: ${trackingNumber || updated.trackingNumber}`);
            if (updateData.expectedDeliveryDate || updated.expectedDeliveryDate) {
                details.push(`Est. Delivery: ${new Date(updateData.expectedDeliveryDate || updated.expectedDeliveryDate).toLocaleDateString('en-IN')}`);
            }
            const label = status === client_1.OrderStatus.DISPATCHED ? 'Shipped' : status === client_1.OrderStatus.DELIVERED ? 'Delivered' : status === client_1.OrderStatus.PROCESSING ? 'Processing' : status === client_1.OrderStatus.CANCELLED ? 'Cancelled' : 'Dispatch Pending';
            historyNote = details.length > 0
                ? `Stage changed to ${label} (${details.join(', ')})`
                : `Stage changed to ${label}`;
        }
        await this.prisma.orderStatusHistory.create({
            data: {
                orderId: order.id,
                status,
                note: historyNote,
                changedBy: 'Admin',
            },
        });
        await this.cache.invalidatePrefix('analytics:');
        await this.cache.invalidatePrefix('inventory:');
        await this.cache.invalidatePrefix('crm:');
        return updated;
    }
    async updatePayment(id, paymentStatus, paymentMethod) {
        const order = await this.prisma.order.findFirst({
            where: { OR: [{ id }, { orderNumber: id }] },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order '${id}' not found`);
        return this.prisma.order.update({
            where: { id: order.id },
            data: {
                paymentStatus,
                paymentMethod: paymentMethod || order.paymentMethod,
            },
            include: { items: true, history: true },
        });
    }
    async getInvoiceData(id) {
        const order = await this.findOne(id);
        return {
            company: {
                name: 'Krishna Textiles Pvt Ltd',
                tagline: 'Leading Textile Manufacturers & Hosiery Wholesalers',
                gstin: '33AAACK9911D1ZX',
                pan: 'AAACK9911D',
                address: '88/4, Tiruppur Main Textile Complex',
                city: 'Tiruppur',
                state: 'Tamil Nadu - 641604',
                phone: '+91 421 249 8899',
                email: 'billing@krishnatextiles.com',
                website: 'www.krishnatextiles.com',
            },
            order,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        custom_cache_service_1.CustomCacheService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map