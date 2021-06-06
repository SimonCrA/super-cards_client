<template>
 <v-container>
  <v-card>
    <v-divider class="ma-4"></v-divider>
    <h3 class="ma-4">Title</h3>
    <v-row justify="center" class="ma-4">
      <v-col md="12">
        <v-text-field
          class="ma-4"
          v-model="title"
          :counter="10"
          label="Card Title"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="ma-4"></v-divider>
    <h3 class="ma-4">Colors</h3>
    <v-row justify="center">
      <v-col md="4">
        <div>
          <v-color-picker
            name="background"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: backgroundColor}' class="textP">{{ backgroundColor }}</p>
      </v-col>
      <v-col md="4">
        <div>
          <v-color-picker
            name="icon"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: iconColor}' class="textP">{{ iconColor }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4">
        <div>
          <v-color-picker
            name="text"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: textColor}' class="textP">{{ textColor }}</p>
      </v-col>
      <v-col md="4">
        <div>
          <v-color-picker
            name="bar"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: barColor}' class="textP">{{ barColor }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4">
        <div>
          <v-color-picker
            name="card"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: cardColor}' class="textP">{{ cardColor }}</p>
      </v-col>
      <v-col md="4">
        <div>
          <v-color-picker
            name="footer"
            @colorPicked="colorEvent"
            style="text-align: center; !important"
          ></v-color-picker>
        </div>
        <p :style='{color: footerColor}' class="textP">{{ footerColor }}</p>
      </v-col>
    </v-row>
    <v-divider class="ma-4"></v-divider>
    <h3 class="ma-4">Icon</h3>
    <v-row justify="center" class="ma-4">
      <v-col md="12" style="text-align: center;">
        <v-icon class="ma-4" size="40px">{{iconSelected}}</v-icon>
        <v-autocomplete
          v-model="iconSelected"
          :items="items"
          outlined
          dense
          label="Icons"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-divider class="ma-4"></v-divider>
    <h3 class="ma-4">Markdwon Content</h3>
    <v-row justify="center" class="ma-3">
      <v-col md="12">
        <v-textarea
          v-model="text"
          outlined
          name="input-7-4"
          label="Markdown area"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-card-actions class="justify-end">
      <v-btn
        text
        color="red"
        @click="dialog.value = false"
      >Cancel</v-btn>
      <v-btn
        text
        color="primary"
        @click="createCard"
      >Create</v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ColorPicker from './ColorPicker.vue';

export default {
  name: 'CardParameters',
  props: {
    dialog: Object,
  },
  components: {
    'v-color-picker': ColorPicker,
  },
  data: () => ({
    title: '',
    backgroundColor: '#000000',
    iconColor: '#000000',
    textColor: '#000000',
    barColor: '#000000',
    cardColor: '#000000',
    footerColor: '#000000',
    items: [
      'mdi-car',
      'mdi-tree',
      'mdi-heart',
      'mdi-box',
      'mdi-plus',
      'mdi-file',
      'mdi-account',
      'mdi-billiards',
      'mdi-brain',
      'mdi-briefcase',
      'mdi-broom',
      'mdi-brush',
    ],
    iconSelected: '',
    text: '#bigTitle **bold** *italic* - unorderedLists 1. orderedList',
  }),
  computed: {
    ...mapGetters('auth', ['getLoggedUserId']),
  },
  methods: {
    colorEvent(color, name) {
      if (name === 'background') {
        this.backgroundColor = color;
      } else if (name === 'icon') {
        this.iconColor = color;
      } else if (name === 'text') {
        this.textColor = color;
      } else if (name === 'bar') {
        this.barColor = color;
      } else if (name === 'card') {
        this.cardColor = color;
      } else if (name === 'footer') {
        this.footerColor = color;
      }
    },
    createCard() {
      const dataObject = {
        user: this.getLoggedUserId,
        title: this.title,
        icon: this.iconSelected,
        backgroundColor: this.backgroundColor,
        iconColor: this.iconColor,
        textColor: this.textColor,
        barColor: this.barColor,
        cardColor: this.cardColor,
        footerColor: this.footerColor,
        text: this.text,
      };
      this.$emit('cardStylesData', dataObject);
      this.dialog.value = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.textP {
   text-align: center;
}
</style>
