import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../order/schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../order/dtos/create-order.dto';
import { OrdersService } from '../order/service/order.service';
import { UsersService } from '../user/service/user.service';
import { ProductsService } from '../product/service/product.service';

@Injectable()
export class ReportsService {
  constructor(
    private ordersModel: OrdersService,
    private usersModel: UsersService,
    private productsModel: ProductsService,
  ) {}

  async getAnalytics() {
    const totalUsers = await this.usersModel.count();
    const totalProducts = await this.productsModel.count();
    const totalOrders = await this.ordersModel.count();
    return { totalUsers: totalUsers, totalProducts: totalProducts, totalOrders: totalOrders };
  }
}