<template>
  <v-container>
    <v-nav-drawer></v-nav-drawer>
    <h1 class="text-center">Archived Cards</h1>
    <v-slide-group :cards="cardsArchived"></v-slide-group>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import NavDrawer from '../components/Shared/NavDrawer.vue';
import SlideGroupIndex from '../components/SlideGroup/SGIndex.vue';

export default {
  name: 'Archive',
  components: {
    'v-nav-drawer': NavDrawer,
    'v-slide-group': SlideGroupIndex,
  },
  data: () => ({}),
  computed: {
    ...mapState('card', ['cardsArchived']),
  },
  mounted() {
    this.$store.dispatch('card/getCards', false);
  },

};
</script>

<style>

</style>
