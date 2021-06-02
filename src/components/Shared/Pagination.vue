<template>
  <v-container class="text-center">
    <v-pagination
      v-model="localPage"
      :length="5"
      prev-icon="mdi-menu-left"
      :next-icon="localPage === 5 ? 'mdi-plus-thick' : 'mdi-menu-right' "
      @click="sendPage"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: Number,
  },
  data: () => ({
    localPage: 2,
  }),
  methods: {
    sendPage() {
      this.$emit('pageClicked', this.localPage);
    },
  },
};
</script>

<style>

</style>
