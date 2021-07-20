import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import Modules from './api/modules';

import { MongooseModule } from './database/mongoose.module';

import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }), ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    LoggerModule,
    MongooseModule,
    ...Modules,
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
