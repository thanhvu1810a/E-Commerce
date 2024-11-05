import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AmazonService } from './amazon.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { Public } from 'src/auth/decorator/public.decorator';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('amazon')
export class AmazonController {
  constructor(
    private readonly amazonService: AmazonService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
) {}

  @Public()
  @Cron(CronExpression.EVERY_2_HOURS)
  @Get('products')
  async getProducts(@Query('product') product: string) {
    const data = await this.amazonService.getProducts(product);
    await this.cacheManager.set('product',data)  
    return true
  }

  @Public()
  @Get('getproducts')
  async getProduct(@Query('product') product: string){
    return await this.cacheManager.get('product') 
  }
}