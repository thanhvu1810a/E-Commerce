import { Controller, Post, Get, Patch, Delete, Param, Body, Req, Put } from '@nestjs/common';
import { CartService } from '../servcie/cart.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { Request } from 'express';
import { ReqAuthUser } from 'src/common/decorator/request.decorator';
import { AuthUser } from 'src/auth/types/auth.type';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(@ReqAuthUser() req: AuthUser, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req._id;
    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Put('update/:itemId')
  updateItem(@ReqAuthUser() req: AuthUser, @Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    const userId = req._id;
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  removeItem(@ReqAuthUser() req: AuthUser, @Param('itemId') itemId: string) {
    const userId = req._id;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@ReqAuthUser() req: AuthUser) {
    const userId = req._id;
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  async checkout(@ReqAuthUser() req: AuthUser) {
    const userId = req._id;
    const cart = await this.cartService.getCartSummary(userId);
    // Integrate the order placement and payment here
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}