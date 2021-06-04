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
        console.log(respCardService);
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
      try {
        const respCreateCardService = await CardService.createCard(body);
        console.log(respCreateCardService);
        commit('updateCardState');
      } catch (error) {
        console.log(error);
      }
    },
    async editCard({ commit }, cardId, body) {
      try {
        const respUpdateCardService = await CardService.updateCardById(cardId, body);
        console.log(respUpdateCardService);
        commit('updateCardState');
      } catch (error) {
        console.log(error);
      }
    },
    async archiveCard(cardId) {
      try {
        const respDisableCardService = await CardService.disableCardById(cardId);
        console.log(respDisableCardService);
      } catch (error) {
        console.log(error);
      }
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
