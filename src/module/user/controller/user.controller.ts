import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UsersService } from '../service/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { ReqAuthUser } from 'src/common/decorator/request.decorator';
import { AuthUser } from 'src/auth/types/auth.type';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get('profile')
  async getProfile(@ReqAuthUser() user:AuthUser) {
    return this.usersService.findAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@ReqAuthUser() user:AuthUser, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(user._id, updateUserDto);
    return this.usersService.findOneByEmail(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(@ReqAuthUser() user:AuthUser) {
    await this.usersService.remove(user._id);
  }
}