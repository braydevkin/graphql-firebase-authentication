import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

import { ProductSchema } from 'src/database/models/Product.model';

import { PRODUCT_REPOSITORY_PROVIDER_KEY } from '../constants';

import { ProductMongooseRepository } from './product.mongoose.repository';

import { Product } from '../entities/product.entity';

import { MongooseModule } from 'src/database/mongoose.module';

const mongooseFeatures = [
    NestMongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
];
const productMongooseRepository = {
    provide: PRODUCT_REPOSITORY_PROVIDER_KEY,
    useClass: ProductMongooseRepository,
};
@Module({
    imports: [...mongooseFeatures, MongooseModule],
    providers: [productMongooseRepository],
    exports: [...mongooseFeatures, productMongooseRepository],
})
export class ProductMongooseModule { }