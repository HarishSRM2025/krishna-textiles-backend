import { OrdersService } from './orders.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(status?: OrderStatus, search?: string, customerId?: string, page?: number, limit?: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        orders: ({
            customer: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                company: string | null;
                gstin: string | null;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                type: import(".prisma/client").$Enums.CustomerType;
                creditLimit: number;
            };
            items: {
                id: string;
                orderId: string;
                productId: string | null;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }[];
            history: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
                orderId: string;
                note: string | null;
                changedBy: string | null;
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
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            customer: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                company: string | null;
                gstin: string | null;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                type: import(".prisma/client").$Enums.CustomerType;
                creditLimit: number;
            };
            items: ({
                product: {
                    id: string;
                    name: string;
                    slug: string;
                    brand: string;
                    brandId: string;
                    category: string;
                    categoryId: string | null;
                    brandRefId: string | null;
                    price: number;
                    mrp: number;
                    discount: number;
                    rating: number;
                    reviews: number;
                    imageUrl: string | null;
                    images: string[];
                    bestSeller: boolean;
                    description: string | null;
                    sizes: string[];
                    stock: number;
                    minStockAlert: number;
                    sku: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                orderId: string;
                productId: string | null;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            })[];
            history: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
                orderId: string;
                note: string | null;
                changedBy: string | null;
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
        };
    }>;
    getInvoice(id: string): Promise<{
        success: boolean;
        data: {
            company: {
                name: string;
                tagline: string;
                gstin: string;
                pan: string;
                address: string;
                city: string;
                state: string;
                phone: string;
                email: string;
                website: string;
            };
            order: {
                customer: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string | null;
                    phone: string;
                    company: string | null;
                    gstin: string | null;
                    address: string | null;
                    city: string | null;
                    state: string | null;
                    pincode: string | null;
                    type: import(".prisma/client").$Enums.CustomerType;
                    creditLimit: number;
                };
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                        brand: string;
                        brandId: string;
                        category: string;
                        categoryId: string | null;
                        brandRefId: string | null;
                        price: number;
                        mrp: number;
                        discount: number;
                        rating: number;
                        reviews: number;
                        imageUrl: string | null;
                        images: string[];
                        bestSeller: boolean;
                        description: string | null;
                        sizes: string[];
                        stock: number;
                        minStockAlert: number;
                        sku: string;
                        isActive: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } & {
                    id: string;
                    orderId: string;
                    productId: string | null;
                    productName: string;
                    size: string | null;
                    quantity: number;
                    unitPrice: number;
                    totalPrice: number;
                })[];
                history: {
                    id: string;
                    createdAt: Date;
                    status: import(".prisma/client").$Enums.OrderStatus;
                    orderId: string;
                    note: string | null;
                    changedBy: string | null;
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
            };
        };
    }>;
    create(body: any): Promise<{
        success: boolean;
        message: string;
        data: {
            customer: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                company: string | null;
                gstin: string | null;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                type: import(".prisma/client").$Enums.CustomerType;
                creditLimit: number;
            };
            items: {
                id: string;
                orderId: string;
                productId: string | null;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }[];
            history: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
                orderId: string;
                note: string | null;
                changedBy: string | null;
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
        };
    }>;
    updateStatus(id: string, body: {
        status: OrderStatus;
        trackingNumber?: string;
        courierPartner?: string;
        dispatchedAt?: string;
        expectedDeliveryDate?: string;
        note?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            customer: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string;
                company: string | null;
                gstin: string | null;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                type: import(".prisma/client").$Enums.CustomerType;
                creditLimit: number;
            };
            items: {
                id: string;
                orderId: string;
                productId: string | null;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }[];
            history: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
                orderId: string;
                note: string | null;
                changedBy: string | null;
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
        };
    }>;
    updatePayment(id: string, body: {
        paymentStatus: PaymentStatus;
        paymentMethod?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            items: {
                id: string;
                orderId: string;
                productId: string | null;
                productName: string;
                size: string | null;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }[];
            history: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
                orderId: string;
                note: string | null;
                changedBy: string | null;
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
        };
    }>;
}
