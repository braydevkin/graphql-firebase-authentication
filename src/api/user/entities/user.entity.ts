import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Field({ nullable: true, })
  name: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;
}
