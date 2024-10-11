import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import { DEV } from '@/api/config';
import publicRoutes from './publicRoutes';
import dashboardRoutes from './dashboardRoutes';
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

export default router;