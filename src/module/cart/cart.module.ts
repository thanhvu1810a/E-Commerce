import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Cart, CartItem, CartItemSchema, CartSchema } from './schema/Cart.schema';
import { CartController } from './controller/Cart.controller';
import { CartService } from './servcie/cart.service';
import { UsersModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name:Cart.name,schema:CartSchema},{name:CartItem.name,schema:CartItemSchema}]),
    UsersModule,
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartsModule {}