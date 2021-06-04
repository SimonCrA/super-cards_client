<template>
  <v-container>
    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="600"
    >
      <v-slide-group
        v-model="model"
        class="pa-6"
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="card in cards"
          :key="card._id"
          v-slot="{ }"
        >
          <!-- <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="450"
            width="250"
            @click="toggle"
          >
            <v-scale-transition>
              <v-row
                v-if="active"
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-icon
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-row>
            </v-scale-transition>
            <v-scale-transition>
              <v-row
                v-if="active === false"
                class="fill-height"
                align="center"
              >
                <v-content-card></v-content-card>
              </v-row>
            </v-scale-transition>
          </v-card> -->
          <v-card
            color="deep-purple lighten-5"
            class="ma-4"
            height="450"
            width="250"
          >
            <v-content-card :cardContent="card"></v-content-card>
            <v-footer-card :cardContent="card"></v-footer-card>
            <!-- <v-row
              v-if="active === false"
              class="fill-height ma-0"
              align="center"
            >
            </v-row> -->
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
  },
  components: {
    'v-content-card': SGContentCard,
    'v-footer-card': SGFooter,
  },
  data: () => ({
    model: null,
  }),
};
</script>

<style>

</style>
