<template>
  <v-container>
    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="600"
    >
      <v-slide-group
        v-model="clicked"
        class="pa-6"
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="card in cards"
          :key="card._id"
        >
          <v-card
            :color="card.backgroundColor"
            class="ma-4"
            height="450"
            width="250"
          >
            <v-content-card :cardContent="card"></v-content-card>
            <v-footer-card :cardContent="card"></v-footer-card>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import SGContentCard from '@/components/SlideGroup/SGContentCard.vue';
import SGFooter from '@/components/SlideGroup/SGFooter.vue';

export default {
  name: 'SlideGroup',
  props: {
    cards: Array,
    clicked: Number,
  },
  components: {
    'v-content-card': SGContentCard,
    'v-footer-card': SGFooter,
  },
  data: () => ({

  }),
};
</script>

<style>

</style>
