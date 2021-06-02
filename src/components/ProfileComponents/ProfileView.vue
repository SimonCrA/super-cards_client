<template>
  <v-container  >
    <div>
      <h1 class="texts">Name: </h1>
      <h2 class="texts">{{user[0].name}}</h2>
    </div>
    <div>
      <h1 class="texts">Lastname: </h1>
      <h2 class="texts">{{user[0].lastname}}</h2>
    </div>
    <div>
      <h1 class="texts">email: </h1>
      <h2 class="texts">{{user[0].email}}</h2>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileView',
  data: () => ({}),
  computed: {
    ...mapState('user', ['user']),
  },
};
</script>

<style lang="scss" scoped>
.texts {
  display: inline;
  color: #356859 !important;
}
</style>
