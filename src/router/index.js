import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import { DEV } from '@/api/config';
import publicRoutes from './publicRoutes';
import dashboardRoutes from './dashboardRoutes';

import store from '@/store'; // Import Vuex store để truy cập vào token và quyền
import { verifyAdmin } from '@/services/authService'; // Hàm kiểm tra quyền admin

export const routes = [
    ...publicRoutes,
    ...dashboardRoutes
];


const router = createRouter({
    history: !DEV ? createWebHashHistory() : createWebHistory(),
    routes,
    linkActiveClass: 'bg-gray-100 bg-opacity-5',
    linkExactActiveClass: 'bg-gray-100 bg-opacity-5',
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + to.meta.description;
    }
    if (to.meta.description) {
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', to.meta.description);
        } else {
            const newDescriptionTag = document.createElement('meta');
            newDescriptionTag.setAttribute('name', 'description');
            newDescriptionTag.setAttribute('content', to.meta.description);
            document.head.appendChild(newDescriptionTag);
        }
    }

    next();
});




router.beforeEach(async (to, from, next) => {
    const isAuthenticated = store.getters['auth/token']; // Lấy token từ Vuex store
    const isAdmin = await verifyAdmin(); // Gọi hàm kiểm tra quyền admin
    // Nếu người dùng không có token và không phải trang /login thì chuyển hướng tới /login
    if (!isAuthenticated && to.path !== '/login') {
        return next('/login');
    }
    // Nếu đã đăng nhập nhưng không có quyền admin, ngăn chặn truy cập các trang cần quyền
    if (isAuthenticated && to.path !== '/login' && !isAdmin) {
        return next('/login'); // Chuyển hướng tới /login nếu không có quyền
    }
    // Nếu đã đăng nhập và có quyền admin, hoặc là trang public, cho phép truy cập
    return next();
});

export default router;