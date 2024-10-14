import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getAllRoles = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/roles/all`,);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
