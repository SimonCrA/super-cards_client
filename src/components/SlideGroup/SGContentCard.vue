<template>
  <v-container class="text-center">
      <v-avatar
        class="mx-4 myClass"
        size="60"
        tile
      >
        <v-icon
          size="50"
          :color="cardContent.iconColor"
        >
          {{cardContent.icon}}
        </v-icon>
      </v-avatar>
      <h3 class="mt-6" :style="{color: cardContent.textColor}">{{cardContent.title}}</h3>
      <v-alert
        border="top"
        dense
        :color="cardContent.barColor"
        dark
      >
      </v-alert>
      <v-sheet
        class="text-center mx-auto"
        :color="cardContent.cardColor"
        elevation="20"
        height="280"
        rounded
        width="220"
        v-html="compiledMarkdown"
      ></v-sheet>
      <v-divider class="mt-3"></v-divider>
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
