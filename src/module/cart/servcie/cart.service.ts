import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cart, CartItem } from '../schema/cart.schema';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { UsersService } from 'src/module/user/service/user.service';
import { ProductsService } from 'src/module/product/service/product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDocument, CartItemDocument } from '../schema/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    @InjectModel(CartItem.name)
    private cartItemModel: Model<CartItemDocument>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async findOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel.findOne({ where: { user: { id: userId } }, relations: ['items', 'items.product'] });
    if (!cart) {
      const user = await this.usersService.findOneById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart = await this.cartModel.create({ user, items: [] });
    }
    return cart;
  }

  async addItem(userId: string, createCartItemDto: CreateCartItemDto): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const { productId, quantity } = createCartItemDto;
    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = cart.items.find(items => items.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = await this.cartItemModel.create({cart, product, quantity});
      cart.items.push(cartItem);
    }

    await this.cartItemModel.create(cartItem);
    return this.cartModel.create(cart);
  }

  async updateItem(userId: string, cartItemId: string, updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const cartItem = cart.items.find(item => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemModel.create(cartItem);
    return this.cartModel.create(cart);
  }

  async removeItem(userId: string, cartItemId: string): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const cartItemIndex = cart.items.findIndex(item => item.id === cartItemId);
    if (cartItemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    const [cartItem] = cart.items.splice(cartItemIndex, 1);
    await this.cartItemModel.deleteOne(cartItem);
    return this.cartModel.create(cart);
  }

  async getCartSummary(userId: string): Promise<Cart> {
    return this.findOrCreateCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.findOrCreateCart(userId);
    await this.cartItemModel.deleteOne(cart.items);
    cart.items = [];
    await this.cartModel.create(cart);
  }
}