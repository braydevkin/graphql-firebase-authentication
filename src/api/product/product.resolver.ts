import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductService } from './product.service';

import { Product } from './entities/product.entity';


import { PRODUCT_SERVICE_PROVIDER_KEY } from './constants';
import { FiltersProductInput } from './dto/filters.product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(@Inject(PRODUCT_SERVICE_PROVIDER_KEY) private readonly productService: ProductService) { }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'getProducts' })
  findAll(@Args('getProducts', { type: () => FiltersProductInput }) filters: FiltersProductInput) {
    return this.productService.findAll(filters);
  }

  @Query(() => Product, { name: 'getProduct' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') id: string, updateProductInput: UpdateProductInput) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
