import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

import { USER_SERVICE_PROVIDER_KEY } from './constants';

import { AuthModule } from 'src/shared/auth/auth.module';
import { LoggerModule } from 'src/shared/logger/logger.module';

import { UserMongooseModule } from './infra/user.mongoose.module';



const userService = {
  provide: USER_SERVICE_PROVIDER_KEY,
  useClass: UserService
}

@Module({
  imports: [AuthModule, UserMongooseModule, LoggerModule],
  providers: [UserResolver, userService],
  exports: [userService]
})
export class UserModule { }
