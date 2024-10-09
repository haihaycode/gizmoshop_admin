import Axios from '@/api/axios';
import {HOST} from '@/api/config'

export const loginApi = async (loginObject) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/auth/login`, loginObject);
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        throw new Error(`${error}`);
    }
};
