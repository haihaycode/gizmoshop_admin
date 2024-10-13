import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const createInventory = async (inventoryObject) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/inventory/create`, inventoryObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const listInventory = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/list`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

