/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import jwtInterceptor from './authJwtInterceptor';
import store from '../store/index';

class UserService {
  async getLoggedInUserData() {
    const userId = store.getters['auth/getLoggedUserId'];
    const resp = await jwtInterceptor.get(`users/${userId}`);
    return resp;
  }

  async updateUser(body) {
    const userId = store.getters['auth/getLoggedUserId'];
    const response = await jwtInterceptor.patch(`users/${userId}`, body);
    return response;
  }

  async deleteUser() {
    const userId = store.getters['auth/getLoggedUserId'];
    const response = await jwtInterceptor.delete(`users/delete/${userId}`);
    return response;
  }
}

export default new UserService();
