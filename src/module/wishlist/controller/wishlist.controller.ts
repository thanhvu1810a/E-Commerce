import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { AuthUser } from 'src/auth/types/auth.type';
import { ReqAuthUser } from 'src/common/decorator/request.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId') 
  addToWishlist(@ReqAuthUser() user:AuthUser, @Param('productId') productId: string) {
    const userId = user._id;
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Delete(':productId')
  removeFromWishlist(@ReqAuthUser() user:AuthUser, @Param('productId') productId: string) {
    const userId = user._id;
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get()
  viewWishlist(@ReqAuthUser() user:AuthUser) {
    const userId = user._id;
    return this.wishlistService.viewWishlist(userId);
  }
}