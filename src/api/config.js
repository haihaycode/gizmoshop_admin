export const MAX_TIME_OUT = 120000

export const SUCCESS_CODE = 200

export const DEV = process.env.NODE_ENV !== 'production';

//export const HOST = DEV ? 'http://68.183.238.32:8081' : 'http://68.183.238.32:8081';
export const HOST = DEV ? 'http://localhost:8081' : 'http://localhost:8081';
