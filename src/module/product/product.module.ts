import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductsService } from './service/product.service';
import { ProductsController } from './controller/product.controller';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Product.name,schema:ProductSchema},
      {name:Category.name,schema:CategorySchema}
    ]),
    PassportModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductModule {}