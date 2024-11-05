import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Category } from './category.schema';


export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {

  @Prop()
  id:string
   
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price:number

  @Prop()
  sku: string

  @Prop()
  quantity: number 

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  category: Category;

}
export const ProductSchema = SchemaFactory.createForClass(Product);