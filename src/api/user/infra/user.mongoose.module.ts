import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

import { USER_REPOSITORY_PROVIDER_KEY } from '../constants';

import { UserMongooseRepository } from './user.mongoose.repository';

import { MongooseModule } from 'src/database/mongoose.module';
import { User, UserSchema } from 'src/database/models/Users.model';

const mongooseFeatures = [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];
const userMongooseRepository = {
    provide: USER_REPOSITORY_PROVIDER_KEY,
    useClass: UserMongooseRepository,
};
@Module({
    imports: [...mongooseFeatures, MongooseModule],
    providers: [userMongooseRepository],
    exports: [...mongooseFeatures, userMongooseRepository],
})
export class UserMongooseModule { }