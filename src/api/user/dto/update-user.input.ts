import { CreateUserInput } from './create-user.input';

import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true, })
  name: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;
}
