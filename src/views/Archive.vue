<template>
  <v-container>
    <v-nav-drawer></v-nav-drawer>
    <h1 class="text-center">Archived Cards</h1>
    <v-pagination
       v-if="cardsArchived.length !== 0"
      @pageClicked="pageEvent"
      :cardsLength="cardsArchived.length"
    ></v-pagination>
    <v-slide-group
      v-if="cardsArchived.length !== 0"
      :cards="cardsArchived" :clicked="clicked"
    ></v-slide-group>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import NavDrawer from '../components/Shared/NavDrawer.vue';
import Pagination from '../components/Shared/Pagination.vue';
import SlideGroupIndex from '../components/SlideGroup/SGIndex.vue';

export default {
  name: 'Archive',
  components: {
    'v-nav-drawer': NavDrawer,
    'v-slide-group': SlideGroupIndex,
    'v-pagination': Pagination,
  },
  data: () => ({
    clicked: 0,
  }),
  computed: {
    ...mapState('card', ['cardsArchived']),
  },
  mounted() {
    this.$store.dispatch('card/getCards', false);
  },
  methods: {
    pageEvent(data) {
      this.clicked = data - 1;
    },
  },

};
</script>

<style>

</style>
