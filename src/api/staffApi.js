import Axios from '@/api/axios';
import { HOST } from '@/api/config'

// hàm để lấy danh sách tài khoản
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

//  hàm để thay đổi trạng thái của tài khoản (deleted)
export const changeActiveById = async (id) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/inventory/changeactive/${id}`,);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// Hàm để cập vai trò cho tài khoản
export const updateRoles = async (accountId) => {
    try {
        const response = await Axios.patch(`/api/admin/account/${accountId}/availability`);
        return response.data;
    } catch (error) {
         throw new Error(`${error.message}`);
    }
};

//  hàm để reset-password cho tài khoản
export const resertAccount = async (accountId) => {
    try {
        const response = await Axios.patch(`/api/admin/account/${accountId}/reset-password `);
        return response.data;
    } catch (error) {
         throw new Error(`${error.message}`);
    }
};
