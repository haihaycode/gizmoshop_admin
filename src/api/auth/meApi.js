import Axios from '@/api/axios';
import {HOST} from '@/api/config'

export const getinfo = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/auth/account`);
        return response.data; 
    } catch (error) {
        throw new Error(`${error}`);
    }
};
