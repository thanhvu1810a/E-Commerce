import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configs from './config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UsersModule } from './module/user/user.module';
import { OrdersModule } from './module/order/order.module';
import { ProductModule } from './module/product/product.module';
import { CartsModule } from './module/cart/cart.module';
import { ReviewModule } from './module/review/review.module';
import { WishListModule } from './module/wishlist/wishlist.module';
import { NotificationsModule } from './module/notifications/notifications.module';
import { PaymentModule } from './module/paypal/payment.module';
import { ReportModule } from './module/report/report.module';
import { AmazonModule } from './module/amazon/amazon.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductModule,
    CartsModule,
    ReviewModule,
    WishListModule,
    NotificationsModule,
    ReportModule,
    AmazonModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL,{autoCreate:true}),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
