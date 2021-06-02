/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {
  status: { loggedIn: true }, user,
} : {
  status: { loggedIn: false }, user: null,
};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    logIn({ commit }, user) {
      return AuthService.login(user)
        .then(
          (user) => {
            commit('loginSuccess', user);
            return Promise.resolve(user);
          },
          (error) => {
            commit('loginFailure');
            return Promise.reject(error.response);
          },
        );
    },
    async logOut({ commit }) {
      try {
        const respAuthServiceLogOut = await AuthService.logout();
        commit('logout');
        localStorage.removeItem('user');
        console.log(respAuthServiceLogOut);
      } catch (error) {
        console.log(error);
      }
    },
    register({ commit }, user) {
      return AuthService.register(user)
        .then(
          (user) => {
            commit('registerSuccess', user);
            return Promise.resolve(user);
          },
          (error) => {
            commit('registerFailure');
            return Promise.reject(error.response);
          },
        );
    },
    saveTokensInStorage({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user));
      commit('tokenUpdated', user);
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    tokenUpdated(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
  },
  getters: {
    getAccessToken(state) {
      return state.user.access_token;
    },
    getRefreshToken(state) {
      return state.user.refresh_token;
    },
    getLoggedUserId(state) {
      return state.user.user;
    },
  },
};
