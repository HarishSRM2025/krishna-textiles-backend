import { Controller, Get, Post, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard';

@ApiTags('Order Management')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders with pagination and status filters' })
  async findAll(
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
    @Query('customerId') customerId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.ordersService.findAll({ status, search, customerId, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details with line items' })
  async findOne(@Param('id') id: string) {
    const data = await this.ordersService.findOne(id);
    return { success: true, data };
  }

  @Get(':id/invoice')
  @ApiOperation({ summary: 'Get printable GST tax invoice data for order' })
  async getInvoice(@Param('id') id: string) {
    const data = await this.ordersService.getInvoiceData(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order (auto deducts stock & generates invoice)' })
  async create(@Body() body: any) {
    const order = await this.ordersService.create(body);
    return {
      success: true,
      message: `Order ${order.orderNumber} placed successfully`,
      data: order,
    };
  }

  @Patch(':id/status')
  @UseGuards(SessionAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status and manual fulfillment details' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { 
      status: OrderStatus; 
      trackingNumber?: string;
      courierPartner?: string;
      dispatchedAt?: string;
      expectedDeliveryDate?: string;
      note?: string;
    },
  ) {
    const updated = await this.ordersService.updateStatus(
      id, 
      body.status, 
      body.trackingNumber, 
      body.note, 
      body.courierPartner, 
      body.dispatchedAt, 
      body.expectedDeliveryDate
    );
    return {
      success: true,
      message: `Order status updated to ${body.status}`,
      data: updated,
    };
  }

  @Patch(':id/payment')
  @UseGuards(SessionAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order payment status' })
  async updatePayment(
    @Param('id') id: string,
    @Body() body: { paymentStatus: PaymentStatus; paymentMethod?: string },
  ) {
    const updated = await this.ordersService.updatePayment(id, body.paymentStatus, body.paymentMethod);
    return {
      success: true,
      message: 'Payment status updated',
      data: updated,
    };
  }
}
