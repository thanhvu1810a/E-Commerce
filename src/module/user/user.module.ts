import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schema/user.schema';
import { UsersService } from './service/user.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './controller/user.controller';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}