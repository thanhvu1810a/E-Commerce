import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { OrdersModule } from '../order/order.module';
import { UsersModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';


@Module({
  imports:[
    OrdersModule,
    UsersModule,
    ProductModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports:[ReportsService]
})
export class ReportModule {}