import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '../schema/review.schema';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { UsersService } from 'src/module/user/service/user.service';
import { ProductsService } from 'src/module/product/service/product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument } from '../schema/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewsModel: Model<ReviewDocument>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addReview(userId: string, productId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const {rating, comment} = createReviewDto
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const review = this.reviewsModel.create({rating, comment, user, product} );
    return review;
  }

  async updateReview(userId: string, reviewId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewsModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.rating = updateReviewDto.rating;
    review.comment = updateReviewDto.comment;
    return this.reviewsModel.create(review);
  }

  async deleteReview(userId: string, reviewId: string): Promise<void> {
    const review = await this.reviewsModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewsModel.findByIdAndDelete(reviewId);
  }

  async getProductReviews(productId: string) {
    return await this.productsService.findProductById(productId);
  }
}