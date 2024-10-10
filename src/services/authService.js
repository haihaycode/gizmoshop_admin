//authService.js


import { jwtDecode } from 'jwt-decode';
import store from '@/store';

export const handleAuthentication = (accessToken, refreshToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        const userRoles = decodedToken.a || [];
        if (Array.isArray(userRoles) && userRoles.includes('ROLE_ADMIN')) {
            store.dispatch('auth/setToken', accessToken);
            store.dispatch('auth/setRefreshToken', refreshToken);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        return false;
    }
};
