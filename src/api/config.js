export const MAX_TIME_OUT = 120000

export const SUCCESS_CODE = 200

export const DEV = process.env.NODE_ENV !== 'production';

export const HOST = DEV ? 'http://localhost:8081' : 'https://gizmoshop-latest.onrender.com/';
// https://gizmoshop-latest.onrender.com/