/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import jwtInterceptor from './authJwtInterceptor';
import store from '../store/index';

class UserService {
  async getCardById(id) {
    const resp = await jwtInterceptor.get(`cards/${id}`);
    return resp;
  }

  async getCardListByUser(status) {
    const userId = store.getters['auth/getLoggedUserId'];
    const resp = await jwtInterceptor.get(`cards?user=${userId}&status=${status}`);
    return resp;
  }

  async createCard(body) {
    const response = await jwtInterceptor.post('cards/', body);
    return response;
  }

  async updateCardById(id, body) {
    const response = await jwtInterceptor.patch(`cards/${id}`, body);
    return response;
  }

  async disableCardById(id) {
    const response = await jwtInterceptor.delete(`cards/${id}`);
    return response;
  }

  async deleteCardById(id) {
    const response = await jwtInterceptor.delete(`cards/delete/${id}`);
    return response;
  }
}

export default new UserService();
