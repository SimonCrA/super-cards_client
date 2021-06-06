<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          :color="picker.hex"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{name}}
          <v-icon dark>
            mdi-palette
          </v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <v-color-picker
          v-model="picker"
          dot-size="15"
          mode="hexa"
        ></v-color-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="sendColor"
          >
            nice
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    name: String,
  },
  data: () => ({
    picker: { hex: '#000000' },
    dialog: null,
  }),
  methods: {
    sendColor() {
      this.$emit('colorPicked', this.picker.hex, this.name);
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
