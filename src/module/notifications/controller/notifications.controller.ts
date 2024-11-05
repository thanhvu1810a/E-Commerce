import { Controller, Post, Get, Patch, Param, Req, Body, Put } from '@nestjs/common';
import { NotificationsService } from '../service/notifications.service';
import { AuthUser } from 'src/auth/types/auth.type';
import { ReqAuthUser } from 'src/common/decorator/request.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  createNotification(@ReqAuthUser() user:AuthUser, @Body('message') message: string) {
    const userId = user._id;
    return this.notificationsService.createInAppNotification(userId, message);
  }

  @Post('/email')
  confirm(@Body() email:string,orderId:string){
    this.notificationsService.sendOrderConfirmation(email,orderId)
  }

  @Get()
  getNotifications(@ReqAuthUser() user:AuthUser) {
    const userId = user._id;
    return this.notificationsService.getNotifications(userId);
  }

  @Put(':notificationId')
  markAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}