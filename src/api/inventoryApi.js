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

// /api/public/inventory/list
export const listInventory = async (inventoryName, active, page = 0, limit = 10, sort = 'id,asc') => {
    const params = { inventoryName, active, page, limit, sort };
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/list`, {
            params: params
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching inventory: ${error}`);
    }
};

//  thay đổi trạng thái của kho
export const changeActiveById = async (id) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/inventory/changeactive/${id}`,);
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

export const fetchChartInventory = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/InventoryStats`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};