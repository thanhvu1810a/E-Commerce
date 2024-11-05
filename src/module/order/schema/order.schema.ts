import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Product } from 'src/module/product/schema/product.schema';
import { User } from 'src/module/user/schema/user.schema';


export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order {

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  status: string

  @Prop()
  total:number

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'OrderItem' }])
  item: OrderItem[]

}
export const OrderSchema = SchemaFactory.createForClass(Order);


export type OrderItemDocument = HydratedDocument<OrderItem>

@Schema()
export class OrderItem {

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  quantity: number

  @Prop()
  price: number

}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
