/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import store from '../store/index';

class AuthService {
  login(user) {
    return axios.post('login', { email: user.email, password: user.password })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  async logout() {
    const { user } = store.state.auth;
    const resp = await axios.post('logout', { token: user.refresh_token });
    return resp;
  }

  register(user) {
    return axios.post('signup', {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new AuthService();
