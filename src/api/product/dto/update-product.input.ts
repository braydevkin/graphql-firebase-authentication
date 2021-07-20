import { InputType, Field, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field({ nullable: true, description: "Product name on model" })
  name: string;

  @Field({ nullable: true, description: "shortDescription name on model" })
  shortDescription: string;

  @Field({ nullable: true, description: "price name on model" })
  price: number;
}
