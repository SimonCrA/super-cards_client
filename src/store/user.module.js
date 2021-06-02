/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
import UserService from '../services/user.service';

export const user = {
  namespaced: true,
  state: {
    user: [],
  },
  actions: {
    async getUserData({ commit }) {
      try {
        const respUserService = await UserService.getLoggedInUserData();
        console.log(respUserService);
        commit('setUserData', respUserService.data.user);
      } catch (error) {
        console.log(error);
      }
    },
    updateUserData({ commit }, user) {
      return UserService.updateUser(user)
        .then(
          (success) => {
            commit('updateUserSuccess', success.data.user);
            return Promise.resolve(success.data.user);
          },
          (error) => Promise.reject(error.response),
        );
    },
  },
  mutations: {
    setUserData(state, userData) {
      state.user.push(userData);
    },
    updateUserSuccess(state, userData) {
      state.user.pop();
      state.user.push(userData);
    },
  },
};
