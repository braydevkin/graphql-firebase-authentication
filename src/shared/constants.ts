// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const PORT = Number(process.env.PORT);

export const MONGOOSE_CONNECTION_STRING = String(process.env.MONGOOSE_CONNECTION_STRING);

export const FIREBASE_ADMIN_INJECT = 'firebase-admin';
export const FIREBASE_ADMIN_NAME = 'firebase-admin';
export const FIREBASE_ADMIN_MODULE_OPTIONS = 'FIREBASE_ADMIN_MODULE_OPTIONS';


export const CORS_WHITE_LIST = [
    'localhost'
]
