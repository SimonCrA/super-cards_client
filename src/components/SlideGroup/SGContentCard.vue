<template>
  <v-container class="text-center">
      <v-avatar
        class="ma-4"
        size="100"
        tile
      >
        <v-icon size="100">mdi-car</v-icon>
      </v-avatar>
      <h1>Title</h1>
      <p>edit Card</p>
      <v-textarea
        class="mx-4"
        id="textarea"
        solo
        name="input-7-4"
        label="Outlined textarea"
        value="The Woodman set to work at once..."
      ></v-textarea>
  </v-container>
</template>

<script>
export default {
  name: 'SGContentCard',
  data: () => ({}),
};
</script>

<style>

</style>
