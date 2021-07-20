import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from 'src/database/models/Product.model';
import { IProductRepository } from '../interfaces/product.repository';
import { MongooseRepository } from 'src/database/mongoose.repository';


@Injectable()
export class ProductMongooseRepository
    extends MongooseRepository<ProductDocument>
    implements IProductRepository {
    constructor(
        @InjectModel(Product.name)
        mongooseModel: Model<ProductDocument>,
    ) {
        super(mongooseModel);
    }
}