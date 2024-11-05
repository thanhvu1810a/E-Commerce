import { User } from 'src/module/user/schema/user.schema';
import { Product } from 'src/module/product/schema/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema()
export class Wishlist {
  @Prop()
  id: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  user: User;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Product' })
  product: Product;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);