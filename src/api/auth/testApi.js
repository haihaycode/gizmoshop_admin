import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const testApi = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/test`);
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        throw new Error(`${error}`);
    }
};
