import { Product } from './product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Product' }])
  products: Product[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);