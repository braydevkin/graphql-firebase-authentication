import { Logger } from '@nestjs/common';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_NAME } from '@aginix/nestjs-firebase-admin';
import { FirebaseUser } from '../types';

export interface FirebaseAuthStrategyOptions {
    extractor: JwtFromRequestFunction;
}
const UNAUTHORIZED = 'Usuário nao autenticado';

export class FirebaseAuthStrategy extends Strategy {
    readonly name = FIREBASE_ADMIN_NAME;
    fail: any;
    success: any;

    constructor(
        options: FirebaseAuthStrategyOptions,
        private extractor: JwtFromRequestFunction,
        private logger = new Logger(FirebaseAuthStrategy.name),
    ) {
        super();

        if (!options.extractor) {
            throw new Error(
                '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
            );
        }

        this.extractor = options.extractor;
    }

    async validate(payload: FirebaseUser): Promise<FirebaseUser> {
        return payload;
    }

    authenticate(req: Request): void {
        const idToken = this.extractor(req);

        if (!idToken) {
            this.fail(UNAUTHORIZED, 401);

            return;
        }

        try {
            admin
                .auth()
                .verifyIdToken(idToken)
                .then((res) => this.validateDecodedIdToken(res))
                .catch((err) => {
                    this.fail({ err }, 401);
                });
        } catch (e) {
            this.logger.error(e);

            this.fail(e, 401);
        }
    }

    private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
        const result = await this.validate(decodedIdToken);

        if (result) {
            this.success(result);
        }

        this.fail(UNAUTHORIZED, 401);
    }
}