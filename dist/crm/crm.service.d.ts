import { PrismaService } from '../prisma/prisma.service';
import { CustomCacheService } from '../cache/custom-cache.service';
import { CustomerType } from '@prisma/client';
export declare class CrmService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CustomCacheService);
    findAll(params: {
        type?: CustomerType;
        search?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        gstin: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
        type: import(".prisma/client").$Enums.CustomerType;
        creditLimit: number;
        totalOrders: number;
        orderCount: number;
        totalSpent: number;
        totalSpend: number;
        avgOrderValue: number;
        lastOrderDate: Date;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        metrics: {
            totalOrders: number;
            totalSpent: number;
            avgOrderValue: number;
        };
        notes: {
            id: string;
            createdAt: Date;
            note: string;
            customerId: string;
            author: string;
        }[];
        orders: ({
            items: {
                id: string;
                productId: string | null;
                orderId: string;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderNumber: string;
            customerId: string | null;
            customerName: string;
            customerPhone: string;
            customerEmail: string | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            subtotal: number;
            taxAmount: number;
            discountAmount: number;
            couponCode: string | null;
            totalAmount: number;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            paymentMethod: string;
            shippingAddress: string | null;
            courierPartner: string | null;
            trackingNumber: string | null;
            dispatchedAt: Date | null;
            expectedDeliveryDate: Date | null;
            notes: string | null;
        })[];
        id: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CustomerType;
        company: string | null;
        gstin: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        creditLimit: number;
    }>;
    create(data: {
        name: string;
        phone: string;
        email?: string;
        company?: string;
        gstin?: string;
        address?: string;
        city?: string;
        state?: string;
        pincode?: string;
        type?: CustomerType;
        creditLimit?: number;
        initialNote?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CustomerType;
        company: string | null;
        gstin: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        creditLimit: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.CustomerType;
        company: string | null;
        gstin: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        creditLimit: number;
    }>;
    addNote(customerId: string, note: string, author?: string): Promise<{
        id: string;
        createdAt: Date;
        note: string;
        customerId: string;
        author: string;
    }>;
    getCrmStats(): Promise<{
        totalCustomers: number;
        wholesaleClients: number;
        vipClients: number;
        retailCustomers: number;
    }>;
}
