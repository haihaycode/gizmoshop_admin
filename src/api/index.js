// api/index.js

import Axios from '@/api/axios'
import { HOST } from './config'


export const testApi = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/test`);
        return response;
    } catch (error) {
        throw new Error(`Lỗi khi test API: ${error}`);
    }
};