<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 red lighten-2">
          {{ action }} Confirmation
        </v-card-title>

        <v-card-text class="mt-8">
          Are you sure you want to {{ action }} this card?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = !dialog"
          >
            no
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="accept"
          >
            yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    icon: String,
    id: String,
    action: String,
    service: String,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    accept() {
      this.$store.dispatch(`card/${this.service}`, this.id).then((res) => {
        if (res) {
          this.$store.dispatch('card/getCards', true);
          this.dialog = !this.dialog;
        }
      }).catch((err) => console.log(err));
    },
  },
};
</script>

<style>

</style>
