import { Injectable, NotFoundException } from '@nestjs/common';
import { Wishlist, WishlistDocument } from '../schema/wishlist.schema';
import { UsersService } from 'src/module/user/service/user.service';
import { ProductsService } from 'src/module/product/service/product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const wishlistItem = this.wishlistModel.create({ user, product });
    return wishlistItem
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const wishlistItem = await this.wishlistModel.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistModel.deleteOne({ user: { id: userId }, product: { id: productId } });
  }

  async viewWishlist(userId: string): Promise<Wishlist[]> {
    return this.wishlistModel.find({ where: { user: { id: userId } }, relations: ['product'] });
  }
}