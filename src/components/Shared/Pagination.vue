<template>
  <v-container class="text-center">
    <v-pagination
      v-model="localPage"
      :length="cardsLength"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @input="clicked"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: Number,
    cardsLength: Number,
  },
  data: () => ({
    localPage: 1,
  }),
  methods: {
    clicked() {
      this.$emit('pageClicked', this.localPage);
    },
  },
};
</script>

<style>

</style>
