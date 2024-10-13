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
