import Cookies from 'js-cookie';// Import js-cookie để thao tác với cookie
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode để giải mã JWT

const state = {
    token: Cookies.get('token') || null, // Đọc token từ cookie nếu có
    refreshToken: Cookies.get('refreshToken') || null, // Đọc refreshToken từ cookie nếu có
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

const getters = {
    token: (state) => state.token,
    refreshToken: (state) => state.refreshToken,
    user: (state) => state.user, // Getter cho user
    role: (state) => state.user ? state.user.a : null, // Lấy role từ token (key "a")
    name: (state) => state.user ? state.user.e : null, // Lấy name/email từ token (key "e")
};

const actions = {
    setToken({ commit }, token) {
        // Lưu token vào cookie
        Cookies.set('token', token, { expires: 1 }); // expires: 1 là 1 ngày
        commit('SET_TOKEN', token);
        // Giải mã JWT để lấy thông tin user từ token
        const decoded = jwtDecode(token);
        Cookies.set('user', JSON.stringify(decoded), { expires: 1 });
        commit('SET_USER', decoded); // Lưu toàn bộ dữ liệu đã giải mã từ token vào state
    },
    setRefreshToken({ commit }, refreshToken) {
        // Lưu refresh token vào cookie
        Cookies.set('refreshToken', refreshToken, { expires: 30 });
        commit('SET_REFRESH_TOKEN', refreshToken);
    },
    logout({ commit }) {
        // Xoá token và refreshToken từ cookie khi đăng xuất
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        commit('LOGOUT');
    },
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
        state.refreshToken = refreshToken;
    },
    SET_USER(state, user) {
        state.user = user; // Lưu thông tin người dùng từ token
    },
    LOGOUT(state) {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
