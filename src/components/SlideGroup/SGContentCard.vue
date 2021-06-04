<template>
  <v-container class="text-center">
      <v-avatar
        class="mx-4 myClass"
        size="60"
        tile
      >
        <v-icon
          size="60"
          color="deep-purple accent-4"
        >
          mdi-tree
        </v-icon>
      </v-avatar>
      <h3 class="mt-6">Title</h3>
      <v-alert
        border="top"
        dense
        :color="cardContent.itemsColor"
        dark
      >
      </v-alert>
      <v-sheet
        class="text-center mx-auto"
        :color="cardContent.textColor"
        elevation="20"
        height="280"
        rounded
        width="220"
        v-html="compiledMarkdown"
      ></v-sheet>
      <v-divider class="mt-3"></v-divider>
      <!-- <v-bottom-navigation
        v-model="value"
        class="mt-2"
        :background-color="cardContent.itemsColor"
        dark
        height="50px"
      >
        <v-btn value="recent">
          <span>Archive</span>

          <v-icon>mdi-package-down</v-icon>
        </v-btn>

        <v-btn value="favorites">
          <span>Edit</span>

          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
      </v-bottom-navigation> -->

  </v-container>
</template>

<script>
import marked from 'marked';

export default {
  name: 'SGContentCard',
  props: {
    cardContent: Object,
  },
  data: () => ({
    value: '',
  }),
  computed: {
    compiledMarkdown() {
      return marked(this.cardContent.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.myClass {
  position: absolute;
  top: -20px;
  left: 80px;
}
</style>
