// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Order, OrderDocument } from '../schema/order.schema';
// import { createInvoice } from 'node-invoice-generator';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// @Injectable()
// export class InvoicesService {
//   constructor(
//     @InjectModel(Order.name)
//     private ordersModel: Model<OrderDocument>,
//   ) {}

//   async generateInvoice(orderId: number): Promise<string> {
//     const order = await this.ordersModel.findOne({orderId}, { relations: ['user', 'items', 'items.product'] });
//     if (!order) {
//       throw new NotFoundException('Order not found');
//     }

//     const invoiceData = {
//       orderId: order.id,
//       customer: {
//         email: order.user.email,
//       },
//       items: order.item.map(item => ({
//         name: item.product.name,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       total: order.total,
//     };

//     const invoicePath = `invoices/invoice_${order.id}.pdf`;
//     createInvoice(invoiceData, invoicePath);

//     return invoicePath;
//   }
// }