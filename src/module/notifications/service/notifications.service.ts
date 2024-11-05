import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/module/user/service/user.service';
import { Notification, NotificationDocument } from '../schema/notifications.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Notification.name) private notificationsModel: Model<NotificationDocument>,
    private usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendOrderConfirmation(email: string, orderId: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Your order with ID ${orderId} has been confirmed.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendShippingUpdate(email: string, orderId: number, status: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Shipping Update',
      text: `Your order with ID ${orderId} is now ${status}.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async createInAppNotification(userId: string, message: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationsModel.create({ user, message });
    return this.notificationsModel.create(notification);
  }

  async getNotifications(userId: string): Promise<Notification[]> {


    return this.notificationsModel.find({ where: { user: { id: userId } } });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationsModel.findOne({notificationId});
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    return this.notificationsModel.create(notification);
  }
}