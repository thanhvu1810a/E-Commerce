import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PaymentsController } from './payments.controller';
import { PaypalService } from './paypal.service';
import { PaymentsService } from '../order/service/payment.service';
import { OrdersService } from '../order/service/order.service';
import { OrdersModule } from '../order/order.module';
import { Order, OrderSchema } from '../order/schema/order.schema';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Order.name,schema:OrderSchema}]),
    OrdersModule
  ],
  controllers: [PaymentsController],
  providers: [PaypalService],
  exports:[PaypalService]
})
export class PaymentModule {}