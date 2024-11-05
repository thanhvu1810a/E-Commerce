import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Wishlist, WishlistSchema } from './schema/wishlist.schema';
import { WishlistService } from './service/wishlist.service';
import { WishlistController } from './controller/wishlist.controller';
import { UsersModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Wishlist.name,schema:WishlistSchema},
    ]),
    UsersModule,
    ProductModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports:[WishlistService]
})
export class WishListModule {}