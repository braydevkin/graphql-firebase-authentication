import { Inject, Injectable } from '@nestjs/common';

import { PRODUCT_REPOSITORY_PROVIDER_KEY } from './constants';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { IProductRepository } from './interfaces/product.repository';

import { IProduct } from 'src/shared/interfaces/models/product.interface';
import { Logger } from 'src/shared/logger/Logger';

@Injectable()
export class ProductService {

  constructor(
    @Inject(PRODUCT_REPOSITORY_PROVIDER_KEY)
    private readonly productRepository: IProductRepository,
    private logger: Logger
  ) { }

  async create(createProductInput: CreateProductInput): Promise<IProduct> {
    try {
      this.logger.log(`Registering product with name ${createProductInput.name}`)
      return this.productRepository.create(createProductInput)
    }
    catch (error) {
      this.logger.error(error)
      return error
    }
  }

  async findAll(filters: Partial<IProduct>): Promise<IProduct[]> {
    return await this.productRepository.getAll(filters)
  }

  async findOne(id: string): Promise<IProduct> {
    this.logger.log(`Getting product through ID ${id}`)
    return await this.productRepository.getOne(id)
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    return await this.productRepository.update(id, updateProductInput)
  }

  async remove(id: string) {
    await this.productRepository.delete(id)
  }
}
