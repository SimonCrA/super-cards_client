/* eslint-disable import/prefer-default-export */
export const shared = {
  namespaced: true,
  state: {
    snackbarText: '',
    color: '',
    timeout: '',
  },
  actions: {
    showSnack({ commit }, payload) {
      commit('showMessage', payload);
    },
  },
  mutations: {
    showMessage(state, payload) {
      state.snackbarText = payload.snackbarText;
      state.color = payload.color;
      state.timeout = payload.timeout;
    },
  },
};
