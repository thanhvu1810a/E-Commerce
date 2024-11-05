import { Controller, Post, Get, Patch, Delete, Param, Body, Req, Put } from '@nestjs/common';
import { ReviewsService } from '../service/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { Request } from 'express';
import { AuthUser } from 'src/auth/types/auth.type';
import { ReqAuthUser } from 'src/common/decorator/request.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  addReview(@ReqAuthUser() user:AuthUser, @Param('productId') productId: string, @Body() createReviewDto: CreateReviewDto) {
    const userId = user._id;
    return this.reviewsService.addReview(userId, productId, createReviewDto);
  }

  @Put(':reviewId')
  updateReview(@ReqAuthUser() user:AuthUser, @Param('reviewId') reviewId: string, @Body() updateReviewDto: UpdateReviewDto) {
    const userId = user._id;
    return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  deleteReview(@ReqAuthUser() user:AuthUser, @Param('reviewId') reviewId: string) {
    const userId = user._id;
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('product/:productId')
  getProductReviews(@Param('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }
}