import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Notification, NotificationSchema } from './schema/notifications.schema';
import { NotificationsService } from './service/notifications.service';
import { NotificationsController } from './controller/notifications.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {name:Notification.name,schema:NotificationSchema},
    ]),
    UsersModule,
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports:[NotificationsService]
})
export class NotificationsModule {}