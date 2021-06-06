/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
import CardService from '../services/card.service';

export const card = {
  namespaced: true,
  state: {
    cards: [],
    cardsArchived: [],
  },
  actions: {
    async getCards({ commit }, status) {
      try {
        const respCardService = await CardService.getCardListByUser(status);
        if (status === true) {
          commit('setActiveCards', respCardService.data.cards);
        } else {
          commit('setDisabledCards', respCardService.data.cards);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createCard({ commit }, body) {
      return CardService.createCard(body)
        .then(
          (success) => {
            commit('updateCardState');
            return Promise.resolve(success.data.card);
          },
          (error) => Promise.reject(error.response),
        );
    },
    async editCard({ commit }, data) {
      return CardService.updateCardById(data.id, data.body)
        .then(
          (success) => {
            commit('updateCardState');
            return Promise.resolve(success.data.card);
          },
          (error) => Promise.reject(error.response),
        );
    },
    async archiveCard({ commit }, cardId) {
      return CardService.disableCardById(cardId)
        .then(
          (success) => {
            commit('updateCardState');
            return Promise.resolve(success.data.card);
          },
          (error) => Promise.reject(error.response),
        );
    },
    async unArchiveCard({ commit }, cardId) {
      const body = { status: true };
      return CardService.updateCardById(cardId, body)
        .then(
          (success) => {
            commit('updateCardState');
            return Promise.resolve(success.data.card);
          },
          (error) => Promise.reject(error.response),
        );
    },
    async deleteCard({ commit }, cardId) {
      return CardService.deleteCardById(cardId)
        .then(
          (success) => {
            commit('updateCardState');
            return Promise.resolve(success.data.card);
          },
          (error) => Promise.reject(error.response),
        );
    },
  },
  mutations: {
    setActiveCards(state, cardsData) {
      state.cards = cardsData;
    },
    updateCardState(state) {
      state.cards.length = 0;
    },
    setDisabledCards(state, cardsData) {
      state.cardsArchived = cardsData;
    },
  },
};
