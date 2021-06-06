<template>
  <v-container>
    <v-dialog
      transition="dialog-bottom-transition"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="type === 'create'"
          class="positionButton"
          dark
          large
          color="purple"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark>
            mdi-plus-circle
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-parameters :dialog="dialog" @cardStylesData="cardEvent"></v-parameters>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CardParameters from './CardParameters.vue';

export default {
  name: 'DialogCard',
  props: {
    icon: String,
    type: String,
    id: String,
  },
  components: {
    'v-parameters': CardParameters,
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters('auth', ['getLoggedUserId']),
  },
  methods: {
    cardEvent(data) {
      if (this.type === 'create') {
        this.$store.dispatch('card/createCard', data).then((res) => {
          if (res) {
            this.$store.dispatch('card/getCards', true);
          }
        }).catch((err) => console.log(err));
      } else {
        const editCardData = {
          id: this.id,
          body: data,
        };
        this.$store.dispatch('card/editCard', editCardData).then((res) => {
          if (res) {
            this.$store.dispatch('card/getCards', true);
          }
        }).catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style>

</style>
