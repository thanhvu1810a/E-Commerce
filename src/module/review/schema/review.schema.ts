import { User } from 'src/module/user/schema/user.schema';
import { Product } from 'src/module/product/schema/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {

  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  user: User;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);