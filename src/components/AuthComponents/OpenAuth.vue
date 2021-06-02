<template>
  <v-container>
    <v-dialog
      transition="dialog-bottom-transition"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="positionButton"
          dark
          large
          color="purple"
          v-bind="attrs"
          v-on="on"
        >
          Log in
          <v-icon dark>
            mdi-login-variant
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-login class="authClass" @goToSignup="signupEvent" v-if="!signup"></v-login>
          <v-signup class="authClass" @goToLogin="loginEvent" v-else-if="!login"></v-signup>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="dialog.value = false"
            >Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import Login from './Login.vue';
import Signup from './Signup.vue';

export default {
  name: 'OpenAuth',
  components: {
    'v-login': Login,
    'v-signup': Signup,
  },
  data: () => ({
    signup: false,
    login: true,
  }),
  methods: {
    signupEvent(data) {
      console.log(data);
      this.signup = data;
      this.login = !data;
    },
    loginEvent(data) {
      this.login = data;
      this.signup = !data;
    },
  },
};
</script>

<style lang="scss" scoped>
.positionButton {
  float: right;
}
.authClass {
  padding: 20px 90px;
}
</style>
