// store/modules/auth.js

const state = {
    token: null,
    refreshToken: null,
};

const getters = {
    token: (state) => state.token,
    refreshToken: (state) => state.refreshToken,
};

const actions = {
    setToken({ commit }, token) {
        commit('SET_TOKEN', token);
    },
    setRefreshToken({ commit }, refreshToken) {
        commit('SET_REFRESH_TOKEN', refreshToken);
    },
    logout({ commit }) {
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
    LOGOUT(state) {
        state.token = null;
        state.refreshToken = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
