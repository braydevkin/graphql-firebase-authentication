import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';


@InputType()
export class FiltersProductInput {
    @Field({ nullable: true, description: "Product name on model" })
    @IsString()
    name: string;

    @Field({ nullable: true, description: "shortDescription name on model" })
    @IsString()
    shortDescription: string;

    @Field({ nullable: true, description: "price name on model" })
    @IsNumber()
    price: number;
}
