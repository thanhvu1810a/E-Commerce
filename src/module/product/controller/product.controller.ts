import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { ProductsService } from '../service/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }

  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  findCategoryById(@Param('id') id: string) {
    return this.productsService.findCategoryById(id);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.productsService.removeCategory(id);
  }

  // @Get('search')
  // searchProducts(@Query('query') query: string) {
  //   return this.productsService.searchProducts(query);
  // }

  // @Get('filter')
  // filterProducts(
  //   @Query('categoryId') categoryId?: number,
  //   @Query('minPrice') minPrice?: number,
  //   @Query('maxPrice') maxPrice?: number,
  //   @Query('minRating') minRating?: number,
  // ) {
  //   return this.productsService.filterProducts(categoryId, minPrice, maxPrice, minRating);
  // }
}