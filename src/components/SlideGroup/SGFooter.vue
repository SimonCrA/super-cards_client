<template>
  <v-container>
      <v-footer
        max-height="100px"
        absolute
        padless
        elevation="20"
      >
        <v-sheet
        v-if="cardContent.status === true"
          rounded
          width="100%"
          height="50px"
          :color="cardContent.itemsColor"
          class="my-auto text-center"

        >
          <v-btn
            class="mx-8 my-2"
            icon
          >
            <v-icon size="36px">
              mdi-package-down
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-8 my-2"
            icon
          >
            <v-icon size="36px">
              mdi-square-edit-outline
            </v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet
          v-else-if="cardContent.status === false"
          rounded
          width="100%"
          height="50px"
          :color="cardContent.itemsColor"
          class="my-auto text-center"

        >
          <v-btn
            class="mx-8 my-2"
            icon
          >
            <v-icon size="36px">
              mdi-package-up
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-8 my-2"
            icon
          >
            <v-icon size="36px">
              mdi-delete
            </v-icon>
          </v-btn>
        </v-sheet>
      </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'SGFooter',
  props: {
    cardContent: Object,
  },
  data: () => ({}),
};
</script>

<style>

</style>
