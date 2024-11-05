import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { PaymentsService } from '../service/payment.service';
import { Request } from 'express';
import { Stripe } from 'stripe';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent/:orderId')
  createPaymentIntent(@Param('orderId') orderId: number) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'];
    const stripeEvent = this.paymentsService.stripe.webhooks.constructEvent(
      request.body,
      sig,
      'YOUR_STRIPE_WEBHOOK_SECRET'
    );

    await this.paymentsService.handleWebhook(stripeEvent);
  }

  @Public()
  @Post('momo-payment')
  async momoPayment(){
    return await this.paymentsService.payments()
  }

  @Public()
  @Post('callback')
  async callBack(@Req() req:any){
    return await this.paymentsService.callBack(req)
  }

  @Public()
  @Post('check-status-transaction')
  async checkStatus(@Req() req:any){
    return await this.paymentsService.checkStatus(req)
  }
}