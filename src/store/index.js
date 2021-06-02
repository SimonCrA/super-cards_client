/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { user } from './user.module';
import { shared } from './shared.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    shared,
    user,
  },
});
