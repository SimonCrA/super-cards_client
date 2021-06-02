<template>
<v-container>
  <v-nav-drawer></v-nav-drawer>
  <v-pagination :page="page" @pageClicked="pageEvent"></v-pagination>
  <v-slide-group></v-slide-group>
</v-container>
</template>

<script>
import NavDrawer from '../components/Shared/NavDrawer.vue';
import SlideGroupIndex from '../components/SlideGroup/SGIndex.vue';
import Pagination from '../components/Shared/Pagination.vue';

export default {
  name: 'Me',
  components: {
    'v-nav-drawer': NavDrawer,
    'v-slide-group': SlideGroupIndex,
    'v-pagination': Pagination,
  },
  data: () => ({
    page: 3,
  }),
  mounted() {
    this.$store.dispatch('user/getUserData');
  },
  methods: {
    pageEvent(data) {
      console.log('en home', data);
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
