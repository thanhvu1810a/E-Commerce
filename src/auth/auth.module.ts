import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/module/user/user.module';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject:[ConfigService],
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        global:true,
        secret: configService.get<string>('auth.jwt.accessSecret'),
        signOptions: { expiresIn: configService.get<string>('auth.jwt.accessLifeTime') },
      })
    }),
    UsersModule
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}