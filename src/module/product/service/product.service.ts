import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from '../schema/product.schema';
import { Category, CategoryDocument } from '../schema/category.schema';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productsModel: Model<ProductDocument>,
    @InjectModel(Category.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoriesModel.findById(createProductDto.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = await this.productsModel.create(createProductDto);
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsModel.find();
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productsModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findProductById(id);
    const { categoryId, ...rest } = updateProductDto;
    if (categoryId) {
      const category = await this.categoriesModel.findOne({categoryId});
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }
    Object.assign(product, rest);
    return this.productsModel.create(product);
  }

  async removeProduct(id: string): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsModel.deleteOne(product);
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesModel.create(createCategoryDto);
    return category
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesModel.find();
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesModel.create(category);
  }

  async removeCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesModel.deleteOne(category);
  }

  async count() {
    return await this.productsModel.find().countDocuments();
  }

  // async searchProducts(query: string): Promise<Product[]> {
  //   return this.productsModel.createQueryBuilder('product')
  //     .where('product.name LIKE :query', { query: `%${query}%` })
  //     .orWhere('product.description LIKE :query', { query: `%${query}%` })
  //     .getMany();
  // }

  // async filterProducts(categoryId?: number, minPrice?: number, maxPrice?: number, minRating?: number): Promise<Product[]> {
  //   let queryBuilder = this.productsModel.createQueryBuilder('product');

  //   if (categoryId) {
  //     queryBuilder = queryBuilder.andWhere('product.category.id = :categoryId', { categoryId });
  //   }

  //   if (minPrice) {
  //     queryBuilder = queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
  //   }

  //   if (maxPrice) {
  //     queryBuilder = queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
  //   }

  //   if (minRating) {
  //     queryBuilder = queryBuilder.andWhere('product.rating >= :minRating', { minRating });
  //   }

  //   return queryBuilder.getMany();
  // }
}