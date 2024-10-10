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
    linkActiveClass: 'my-custom-active-class',
    linkExactActiveClass: 'my-custom-exact-active-class',
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