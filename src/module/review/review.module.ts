import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Review, ReviewSchema } from './schema/Review.schema';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './controller/reviews.controller';
import { UsersModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Review.name,schema:ReviewSchema},
    ]),
    UsersModule,
    ProductModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService]
})
export class ReviewModule {}