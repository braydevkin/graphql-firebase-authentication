import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger';


@Schema()
export class Product {
    @ApiProperty()
    _id: string | Types.ObjectId

    @ApiProperty()
    @Prop({
        required: true,
    })
    name: string;

    @ApiProperty()
    @Prop({
        required: true,
    })
    shortDescription: string;

    @ApiProperty()
    @Prop({
        required: true,
    })
    price: number;

    @ApiProperty()
    @Prop({
        default: Date.now(),
    })
    createdAt: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);