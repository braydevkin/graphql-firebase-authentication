import { Module } from '@nestjs/common';

import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';

import { FirebaseStrategy } from './firebase.strategy';

import { FirebaseAdminConfig } from 'src/configs/FirebaseAdmin';

const firebaseAdminModule = FirebaseAdminModule.forRoot(FirebaseAdminConfig);
@Module({
    providers: [FirebaseStrategy],
    imports: [firebaseAdminModule],
    exports: [firebaseAdminModule, FirebaseStrategy],
})
export class FirebaseAuthModule { }