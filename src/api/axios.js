import axios from 'axios';
import { MAX_TIME_OUT, HOST, SUCCESS_CODE } from '@/api/config';
import store from '@/store';
import notificationService from '@/services/notificationService';

// Tạo instance Axios với cấu hình cơ bản
const Axios = axios.create({
    baseURL: HOST,
    timeout: MAX_TIME_OUT,
    responseType: 'json',
    withCredentials: false, // Đặt true để gửi cookie nếu có

});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    console.log("line 22")
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Thêm interceptor cho yêu cầu
Axios.interceptors.request.use(
    config => {
        store.dispatch('loading/setLoading', true); // Bắt đầu hiển thị loading
        if (config.method === 'post') {
            console.log("request : post")// Chuyển đổi dữ liệu post thành chuỗi
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
        store.dispatch('loading/setLoading', false); // Tắt loading sau khi nhận phản hồi
        if (response.status === SUCCESS_CODE) {
            return response; // Trả về dữ liệu nếu mã thành công
        } else {
            // Nếu mã không thành công, hiển thị thông báo lỗi
            notificationService.error(response.message || 'Có lỗi xảy ra!');
            return Promise.reject(response);
        }
    },
    error => {
        console.log("line 65")
        const originalRequest = error.config;
        store.dispatch('loading/setLoading', false); // Tắt loading khi có lỗi

        // Kiểm tra xem có phải lỗi do timeout không
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            notificationService.error('Yêu cầu đã quá thời gian chờ. Vui lòng thử lại.'); // Hiển thị thông báo lỗi timeout
            return Promise.reject(error); // Từ chối lỗi timeout
        }

        // Xử lý lỗi 401 - Unauthorized và kiểm tra refresh token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log("line 75")
            if (store.getters['auth/refreshToken']) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return Axios(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(function (resolve, reject) {
                    Axios.post('/api/public/refresh', { refreshToken: store.getters['auth/refreshToken'] })
                        .then(({ data }) => {
                            store.dispatch('auth/setToken', data.token);
                            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                            processQueue(null, data.token);
                            resolve(Axios(originalRequest));
                        })
                        .catch(err => {
                            processQueue(err, null);
                            store.dispatch('auth/logout');
                            notificationService.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
                            reject(err);
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                });
            } else {
                notificationService.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.'); // Thông báo cho người dùng
                store.dispatch('auth/logout'); // Đăng xuất người dùng
            }
        }

        // Xử lý các lỗi khác
        if (error.response && error.response.data) {
            console.log(error.response.data.message)
            notificationService.error(error.response.data.message || 'Có lỗi xảy ra!'); // Hiển thị thông báo lỗi
        }

        return Promise.reject(error); // Từ chối lỗi
    }
);

export default Axios;
