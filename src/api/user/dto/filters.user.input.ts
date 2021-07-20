import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FiltersUserInput {
    @Field({ nullable: true, })
    name: string;

    @Field({ nullable: true })
    lastname: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    password: string;
}
