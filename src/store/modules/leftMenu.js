// store/modules/leftMenu.js

const state = {
    isLeftMenuOpen: true
};

const getters = {
    isLeftMenuOpen: (state) => state.isLeftMenuOpen
};

const mutations = {
    TOGGLE_LEFT_MENU(state) {
      state.isLeftMenuOpen = !state.isLeftMenuOpen; // Toggle the state
    },
    SET_LEFT_MENU_OPEN(state, value) {
      state.isLeftMenuOpen = value; // Set the state directly
    },
  };
  
  const actions = {
    toggleLeftMenu({ commit }) {
      commit('TOGGLE_LEFT_MENU'); // Use this action to toggle
    },
    setLeftMenuOpen({ commit }, value) {
      commit('SET_LEFT_MENU_OPEN', value); // Use this action to set specific value
    },
  };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
