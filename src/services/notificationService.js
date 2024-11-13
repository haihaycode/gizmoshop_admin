// services/notificationService.js
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true
};

// Hàm khởi tạo vue-toastification, 
//sử dụng khi khởi tạo ứng dụng trong main.js
export function initializeToast(app) {
    app.use(Toast, options);
}

const toast = useToast();

export default {
    success(message = 'Thành công!') {
        toast.success(message);
    },
    error(message = 'Có lỗi xảy ra!') {
        toast.error(message);
    },
    info(message = 'Thông tin!') {
        toast.info(message);
    },
    warning(message = 'Cảnh báo!') {
        toast.warning(message);
    }
};
