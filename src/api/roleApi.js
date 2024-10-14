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


// Hàm để thêm vai trò cho tài khoản
export const addRole = async (accountId, roleNames) => {
    try {
        const response = await Axios.patch(`${HOST}/api/admin/${accountId}/roles/add`, roleNames);
        return response.data;
    } catch (error) {
        throw new Error(`Error adding roles: ${error.message}`);
    }
};