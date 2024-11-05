import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Order, OrderItem, OrderItemSchema, OrderSchema } from './schema/order.schema';
import { OrdersController } from './controller/order.controller';
import { OrdersService } from './service/order.service';
import { PaymentsService } from './service/payment.service';
//import { InvoicesService } from './service/invoices.service';
import { PaymentsController } from './controller/payments.controller';
import { UsersModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { HttpModule } from '@nestjs/axios';
//import { InvoicesController } from './controller/invoices.controller';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Order.name,schema:OrderSchema},
      {name:OrderItem.name,schema:OrderItemSchema}
    ]),
    UsersModule,
    ProductModule,
    HttpModule
  ],
  controllers: [OrdersController,PaymentsController],
  providers: [OrdersService,PaymentsService],
  exports:[OrdersService,PaymentsService]
}) 
export class OrdersModule {}