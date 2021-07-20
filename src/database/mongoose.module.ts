import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

import { MONGOOSE_CONNECTION_STRING } from 'src/shared/constants';

const mongooseConfig = NestMongooseModule.forRoot(MONGOOSE_CONNECTION_STRING, {
    useCreateIndex: true,
    useFindAndModify: false,
})

@Module({
    imports: [mongooseConfig],
    exports: [mongooseConfig]
})
export class MongooseModule { }