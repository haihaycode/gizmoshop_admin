import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
    position: "top-right",
    timeout: 1500, // Shorter duration
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.4,
    showCloseButtonOnHover: false,
    hideProgressBar: true, // No progress bar for a cleaner look
    closeButton: false, // No close button for minimalism
    icon: false // No icon
};

// Inject custom styles for smaller notifications
function injectToastStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .Vue-Toastification__toast {
            font-size: 12px; /* Smaller font size */
            padding: 5px 10px; /* Compact padding */
            min-height: 30px; /* Reduced height */
        }
        .Vue-Toastification__close-button {
            font-size: 10px; /* Smaller close button */
        }
        .Vue-Toastification__progress-bar {
            height: 2px; /* Thin progress bar */
        }
    `;
    document.head.appendChild(style);
}

// Initialize Toast and inject styles
export function initializeToast(app) {
    app.use(Toast, options);
    injectToastStyles(); // Add custom styles when initializing the app
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
