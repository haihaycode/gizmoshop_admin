// services/notificationService.js
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';  // Import CSS cho thông báo

const notyf = new Notyf({
    duration: 3000, // Thời gian hiển thị thông báo (ms)
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'success',
            background: 'green',
            icon: {
                className: 'fas fa-check-circle',
                tagName: 'i',
                text: ''
            }
        },
        {
            type: 'error',
            background: 'red',
            icon: {
                className: 'fas fa-exclamation-circle',
                tagName: 'i',
                text: ''
            }
        }
    ]
});

export default {
    success(message) {
        notyf.success(message || 'Thành công!');
    },

    error(message) {
        notyf.error(message || 'Có lỗi xảy ra!');
    },

    info(message) {
        notyf.open({
            type: 'info',
            message: message || 'Thông tin!',
            background: '#3b82f6', // màu xanh dương
            icon: {
                className: 'fas fa-info-circle',
                tagName: 'i',
                text: ''
            }
        });
    },

    warning(message) {
        notyf.open({
            type: 'warning',
            message: message || 'Cảnh báo!',
            background: '#f59e0b', // màu vàng
            icon: {
                className: 'fas fa-exclamation-triangle',
                tagName: 'i',
                text: ''
            }
        });
    }
};
