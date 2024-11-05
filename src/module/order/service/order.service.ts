import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Order, OrderItem, OrderItemDocument } from '../schema/order.schema';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order.dto';
import { UsersService } from 'src/module/user/service/user.service';
import { ProductsService } from 'src/module/product/service/product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(OrderItem.name)
    private orderItemsModel: Model<OrderItemDocument>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items } = createOrderDto;

    const user = await this.usersService.findOneById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderItems: OrderItem[] = [];
    let total = 0;

    for (const item of items) {
      const product = await this.productsService.findProductById(item.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      const orderItem = await this.orderItemsModel.create({
        product,
        quantity: item.quantity, 
        price: product.price * item.quantity,
      });
      orderItems.push(orderItem);
      total += orderItem.price;
      console.log(orderItem)
    }

    const order = this.orderModel.create({
      user,
      status: 'placed',
      total,
      items: [orderItems],
    });

    return order;
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async count() {
    return await this.orderModel.find().countDocuments();
  }

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrderStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findOrderById(id);
    order.status = updateOrderStatusDto.status;
    await this.orderModel.findByIdAndUpdate(id,order);
    return order
  }

  async removeOrder(id: string): Promise<void> {
    const order = await this.findOrderById(id);
    await this.orderModel.deleteOne(order);
  }
}