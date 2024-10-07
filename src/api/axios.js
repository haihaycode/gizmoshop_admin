// api/axios.js

import axios from 'axios';
import Qs from 'qs';
import { MAX_TIME_OUT, HOST, SUCCESS_CODE } from '@/api/config';
import store from '@/store';
import notificationService from '@/services/notificationService'; // Để hiển thị thông báo lỗi nếu cần

// Tạo instance Axios với cấu hình cơ bản
const Axios = axios.create({
    baseURL: HOST, // URL cơ bản cho API
    timeout: MAX_TIME_OUT, // Thời gian chờ tối đa
    responseType: 'json', // Kiểu phản hồi
    withCredentials: true, // Gửi cookie theo yêu cầu
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // Kiểu nội dung
    }
});

// Thêm interceptor cho yêu cầu
Axios.interceptors.request.use(
    config => {
        store.dispatch('loading/setLoading', true); // Bắt đầu hiển thị loading
        if (config.method === 'post') {
            config.data = Qs.stringify(config.data); // Chuyển đổi dữ liệu post thành chuỗi
        }
        const token = store.getters['auth/token']; // Lấy token từ store
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
        }
        return config;
    },
    error => {
        store.dispatch('loading/setLoading', false); // Tắt loading nếu có lỗi
        return Promise.reject(error);
    }
);

// Thêm interceptor cho phản hồi
Axios.interceptors.response.use(
    response => {
        let data = response.data;
        store.dispatch('loading/setLoading', false); // Tắt loading sau khi nhận phản hồi
        if (response.status === SUCCESS_CODE) {
            return data; // Trả về dữ liệu nếu mã thành công
        } else {
            // Nếu mã không thành công, hiển thị thông báo lỗi
            notificationService.error(data.message || 'Có lỗi xảy ra!');
            return Promise.reject(data);
        }
    },
    error => {
        store.dispatch('loading/setLoading', false); // Tắt loading khi có lỗi
        // Xử lý lỗi 401 - Unauthorized
        if (error.response && error.response.status === 401) {
            notificationService.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.'); // Thông báo cho người dùng
            store.dispatch('auth/logout'); // Đăng xuất người dùng


        }
        // Xử lý các lỗi khác
        if (error.response && error.response.data) {
            notificationService.error(error.response.data.message || 'Có lỗi xảy ra!'); // Hiển thị thông báo lỗi
        }

        return Promise.reject(error); // Từ chối lỗi
    }
);

export default Axios; // Xuất Axios instance
