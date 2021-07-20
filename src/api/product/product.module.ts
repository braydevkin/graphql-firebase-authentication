import { Module } from '@nestjs/common';

import { PRODUCT_SERVICE_PROVIDER_KEY } from './constants';

import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

import { LoggerModule } from 'src/shared/logger/logger.module';

import { ProductMongooseModule } from './infra/product.mongoose.module';

const productService = {
  provide: PRODUCT_SERVICE_PROVIDER_KEY,
  useClass: ProductService
}

@Module({
  imports: [ProductMongooseModule, LoggerModule],
  providers: [ProductResolver, productService],
  exports: [productService]
})
export class ProductModule { }
