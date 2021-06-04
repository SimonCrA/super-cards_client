/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import axios from 'axios';
import store from '../store/index';

const jwtInterceptor = axios.create({});

jwtInterceptor.defaults.withCredentials = true;
jwtInterceptor.defaults.baseURL = 'http://localhost:3000/api/';

jwtInterceptor.interceptors.request.use((config) => {
  const tokenHeader = store.getters['auth/getAccessToken'];

  if (tokenHeader === null) {
    return config;
  }
  config.headers.common.Authorization = `Bearer ${tokenHeader}`;
  return config;
});

jwtInterceptor.interceptors.response.use((response) => response, async (error) => {
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    const refreshToken = store.getters['auth/getRefreshToken'];

    const resp = await axios.post('token', { token: refreshToken });
    await store.dispatch('auth/saveTokensInStorage', resp.data);
    error.config.headers.Authorization = `Bearer ${resp.data.access_token}`;
    return axios(error.config);
  } else {
    return Promise.reject(error);
  }
});

export default jwtInterceptor;
