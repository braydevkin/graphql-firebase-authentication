import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { USER_SERVICE_PROVIDER_KEY } from './constants';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FiltersUserInput } from './dto/filters.user.input';



@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(USER_SERVICE_PROVIDER_KEY)
    private readonly userService: UserService
  ) { }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll(@Args('getUsers', { type: () => FiltersUserInput }) filters: FiltersUserInput) {
    return this.userService.findAll(filters);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') id: string, updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.remove(id);
  }
}
