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



export const updateMe = async (formData) => {
    try {
        // Gửi FormData qua Axios
        const response = await Axios.put(
            `${HOST}/api/public/account/update`,
            formData, // Không cần thiết lập 'Content-Type', Axios sẽ tự động xử lý
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

