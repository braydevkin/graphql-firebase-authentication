import * as admin from "firebase-admin"

import { Inject, Injectable } from '@nestjs/common';

import { USER_REPOSITORY_PROVIDER_KEY } from "./constants";

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { Logger } from "src/shared/logger/Logger";
import { IUserRepository } from "./interfaces/user.repository";
import { IUser } from "src/shared/interfaces/models/user.interface";

@Injectable()
export class UserService {

  constructor(
    @Inject(USER_REPOSITORY_PROVIDER_KEY)
    private readonly userRepository: IUserRepository,
    private logger: Logger
  ) { }

  /**
   * Responsible for saving a user inside firebase authentication
   */
  async recordUserOnFibaseAuth(createUserInput: CreateUserInput): Promise<admin.auth.UserRecord> {
    const userRecord = await admin.auth().createUser({
      email: createUserInput.email,
      password: createUserInput.password,
      displayName: `${createUserInput.name} ${createUserInput.lastname}`,
      emailVerified: true,
      disabled: false,
    });

    return userRecord
  }

  async createUserWithFirebaseAuthentication(createUserInput: CreateUserInput): Promise<void> {
    const firebaseUser = await this.recordUserOnFibaseAuth(createUserInput).catch((err) => {
      this.logger.error(`Register failed to e-mail ${createUserInput.email} on Firebase`, err);
      throw err;
    });

    createUserInput.firebaseId = firebaseUser.uid

    try {
      await this.userRepository.create(createUserInput);
      this.logger.log(`User registred sucessful`);
    }
    catch (err) {
      this.logger.error(err)
    }
  }

  async create(createUserInput: CreateUserInput): Promise<void> {

    // const exists = await this.userRepository.getAll({
    //   email: createUserInput.email,
    // });

    // if (exists) {
    //   throw new HttpException('E-mail already exist', HttpStatus.BAD_REQUEST);
    // }

    try {
      await this.createUserWithFirebaseAuthentication(createUserInput);
      this.logger.log(`Registering User ${createUserInput.email}`);

    }
    catch (err) {
      this.logger.error(err)
    }

  }

  findAll(filters: Partial<IUser>): Promise<IUser[]> {
    try {
      return this.userRepository.getAll(filters)
    }
    catch (err) {
      this.logger.error(err)
    }
  }

  findOne(id: string): Promise<IUser> {
    try {
      return this.userRepository.getOne(id)
    }
    catch (err) {
      this.logger.error(err)
    }

  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<IUser> {
    try {
      return this.userRepository.update(id, updateUserInput)
    }
    catch (err) {
      this.logger.error(err)
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

}



