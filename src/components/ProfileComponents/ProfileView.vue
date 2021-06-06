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
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="red"
          >
            <span>Delete </span>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 red lighten-2">
            Delete Confirmation
          </v-card-title>

          <v-card-text class="mt-8">
            To proceed deleting this account, you must enter this word in the text
            field below "DELETE"
          </v-card-text>

          <v-text-field
            class="ma-6"
            v-model="deleteField"
            prepend-icon="mdi-lock"
          ></v-text-field>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="cancelDelete"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="deleteProfile"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileView',
  data: () => ({
    dialog: false,
    deleteField: '',
  }),
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    cancelDelete() {
      this.dialog = false;
      this.deleteField = '';
    },
    deleteProfile() {
      if (this.deleteField === 'DELETE') {
        this.$store.dispatch('user/deleteUserData');
        this.$store.dispatch('auth/logOut');
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.texts {
  display: inline;
  color: #356859 !important;
}
</style>
