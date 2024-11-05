import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { PaymentsService } from '../order/service/payment.service';
import { PaypalService } from './paypal.service';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paypalService: PaypalService,
  ) {}

  @Post('stripe/create-payment-intent/:orderId')
  createStripePaymentIntent(@Param('orderId') orderId: string) {
    return this.paypalService.createPaymentIntent(orderId);
  }

  @Post('paypal/create-order/:orderId')
  createPaypalOrder(@Param('orderId') orderId: string) {
    return this.paypalService.createOrder(orderId);
  }

  // @Post('paypal/capture-order/:orderId')
  // capturePaypalOrder(@Param('orderId') orderId: string) {
  //   return this.paypalService.captureOrder(orderId);
  // }
}