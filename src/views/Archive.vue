<template>
  <v-container>
    <v-nav-drawer></v-nav-drawer>
  </v-container>
</template>

<script>
import NavDrawer from '../components/Shared/NavDrawer.vue';

export default {
  name: 'Archive',
  components: {
    'v-nav-drawer': NavDrawer,
  },
  data: () => ({}),

};
</script>

<style>

</style>
