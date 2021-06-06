<template>
<v-container>
  <v-nav-drawer></v-nav-drawer>
  <v-pagination
    v-if="cards.length !== 0"
    @pageClicked="pageEvent"
    :cardsLength="cards.length">
  </v-pagination>
  <div class="center">
    <v-create-card type="create"></v-create-card>
  </div>
  <v-slide-group v-if="cards.length !== 0" :cards="cards" :clicked="clicked"></v-slide-group>
</v-container>
</template>

<script>
import { mapState } from 'vuex';
import NavDrawer from '../components/Shared/NavDrawer.vue';
import SlideGroupIndex from '../components/SlideGroup/SGIndex.vue';
import Pagination from '../components/Shared/Pagination.vue';
import DialogCard from '../components/Cards/DialogCard.vue';

export default {
  name: 'Me',
  components: {
    'v-nav-drawer': NavDrawer,
    'v-slide-group': SlideGroupIndex,
    'v-pagination': Pagination,
    'v-create-card': DialogCard,
  },
  computed: {
    ...mapState('card', ['cards']),
  },
  data: () => ({
    clicked: 0,
  }),
  mounted() {
    this.$store.dispatch('user/getUserData');
    this.$store.dispatch('card/getCards', true);
  },
  methods: {
    pageEvent(data) {
      this.clicked = data - 1;
    },
    handleCreateCard() {

    },
  },

};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
