import { User } from 'src/module/user/schema/user.schema';
import { Product } from 'src/module/product/schema/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  user: User;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'CartItem' })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {

  @Prop()
  id: string
  
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Cart' })
  cart: Cart;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Product' })
  product: Product;

  @Prop()
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);