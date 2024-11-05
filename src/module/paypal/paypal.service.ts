import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { OrdersService } from '../order/service/order.service';
import { Order, OrderDocument } from '../order/schema/order.schema';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaypalService {
  private environment: paypal.core.SandboxEnvironment;
  private client: paypal.core.PayPalHttpClient;
  public stripe: Stripe;

  constructor(
    private ordersService: OrdersService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {
    this.environment = new paypal.core.SandboxEnvironment('CLIENT_ID', 'CLIENT_SECRET');
    this.client = new paypal.core.PayPalHttpClient(this.environment);
    this.stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
      apiVersion: '2024-09-30.acacia',
    });
  }

  async createOrder(orderId: string) {
    const order = await this.ordersService.findOrderById(orderId);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: order.total.toString(),
        },
      }],
    });

    const response = await this.client.execute(request);
    return response.result;
  }

  // async captureOrder(orderId: string) {
  //   const request = new paypal.orders.OrdersCaptureRequest(orderId);
  //   request.requestBody({});

  //   const response = await this.client.execute(request);
  //   return response.result;
  // }

  async createPaymentIntent(orderId: string): Promise<Stripe.PaymentIntent> {
    const order = await this.orderModel.findOne({orderId}, { relations: ['user', 'items', 'items.product'] });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe amount is in cents
      currency: 'usd',
      metadata: { orderId: order.id.toString() },
    });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      const order = await this.orderModel.findOne({orderId});
      if (order) {
        order.status = 'paid';
        await this.orderModel.create(order);
      }
    }
  }
}