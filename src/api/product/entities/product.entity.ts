import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field({ nullable: true, description: "Product name on model" })
  name: string;

  @Field({ nullable: true, description: "shortDescription name on model" })
  shortDescription: string;

  @Field({ nullable: true, description: "price name on model" })
  price: number;
}
