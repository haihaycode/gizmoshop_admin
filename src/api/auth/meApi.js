import Axios from '@/api/axios';
import { HOST } from '@/api/config'


// lấy thông tin account đang đăng nhập
export const getinfo = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/auth/account`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


// send otp
export const sendOtp = async (email) => {
    try {

        const response = await Axios.post(`${HOST}/api/public/account/email/otp`, email);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// xác thực email
export const verifyEmail = async (verifyEmail) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/account/email/verify`, verifyEmail);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// update account đang đăng nhập
export const updateMe = async (userData) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/account/update`, userData);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

