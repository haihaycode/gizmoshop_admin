import Axios from '@/api/axios';
import { HOST } from '@/api/config'

// /api/public/inventory/getArr
export const getArrInventories = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/getArr`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
// /api/public/inventory/create
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


// /api/public/inventory/get/{{Id}}
export const getInventoryById = async (id) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/get/${id}`,);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// /api/public/inventory/update/{{id}}
export const updateInventory = async (id, inventoryObject) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/inventory/update/${id}`, inventoryObject);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
