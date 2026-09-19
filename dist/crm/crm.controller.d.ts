import { CrmService } from './crm.service';
import { CustomerType } from '@prisma/client';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    findAll(type?: CustomerType, search?: string): Promise<{
        success: boolean;
        count: number;
        data: {
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
        }[];
    }>;
    getStats(): Promise<{
        success: boolean;
        data: {
            totalCustomers: number;
            wholesaleClients: number;
            vipClients: number;
            retailCustomers: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    create(body: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    update(id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    addNote(id: string, body: {
        note: string;
    }, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            note: string;
            customerId: string;
            author: string;
        };
    }>;
}
