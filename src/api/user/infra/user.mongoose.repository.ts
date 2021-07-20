import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongooseRepository } from 'src/database/mongoose.repository';
import { User, UserDocument } from 'src/database/models/Users.model';

import { IUserRepository } from '../interfaces/user.repository';
import { IUser } from 'src/shared/interfaces/models/user.interface';


@Injectable()
export class UserMongooseRepository
    extends MongooseRepository<UserDocument>
    implements IUserRepository {
    constructor(
        @InjectModel(User.name)
        mongooseModel: Model<UserDocument>,
    ) {
        super(mongooseModel);
    }
    recordUserOnFibaseAuth(data: IUser): Promise<IUser> {
        return this.mongooseModel.create(data)
    }
}