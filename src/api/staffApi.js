import Axios from '@/api/axios';
import { HOST } from '@/api/config'

// /api/admin/account
export const listStaff = async (keyword, deleted, roleName, page = 0, limit = 10, sort = 'id,asc') => {
    const params = { keyword, deleted, roleName, page, limit, sort };
    try {
        const response = await Axios.get(`${HOST}/api/admin/account`, { 
            params: params
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching inventory: ${error}`);
    }
};

// 
export const changeActiveById = async (id) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/inventory/changeactive/${id}`,);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
