<template>
  <v-container>
    <v-layout align-center="true" justify-center="true">
      <v-flex class="login-form text-center">
        <div class="display-2 mb-5" >
          <v-icon class="mr-2" large="large">mdi-cards</v-icon> Cards
        </div>
        <v-card elevation="20">
          <v-card-text>
            <div class="subheading">
              Log in to Cards
            </div>
            <v-scroll-y-transition>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading"
              ></v-progress-circular>
            </v-scroll-y-transition>
            <v-scroll-x-transition>
              <v-alert
                class="mt-4"
                dense
                text
                icon="mdi-alert-octagon"
                color="danger"
                v-if="loginFailed"
              >{{ errMessage }}</v-alert>
            </v-scroll-x-transition>
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
            >
              <form @submit.prevent="handleLogin">
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email">
                    <v-text-field
                      v-model="userData.email"
                      :error-messages="errors"
                      label="E-mail"
                      prepend-icon="mdi-account"
                      required
                    ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="password"
                  rules="mintwo:8">
                    <v-text-field
                      v-model="userData.password"
                      :error-messages="errors"
                      label="Password"
                      type="password"
                      prepend-icon="mdi-lock"
                      required
                    ></v-text-field>
                </validation-provider>
                <v-btn
                  block="block"
                  type="submit"
                  color="primary"
                  :disabled="invalid"
                >
                  submit
                </v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
        <div class="mt-4">Don't you have an account?
          <v-btn text class="ml-3" color="primary" @click="goToSignUp">Sign up</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, min } from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver,
  ValidationProvider, setInteractionMode,
} from 'vee-validate';

import User from '../../models/user';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('email', {
  ...email,
  message: 'Email must be valid',
});

extend('mintwo', {
  ...min,
  message: ' {_field_} Must be 8 alphaNumerics characters min',
});

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    userData: {
      email: '',
      password: '',
    },
    loading: false,
    errMessage: '',
    loginFailed: false,
  }),
  methods: {
    handleLogin() {
      const user = new User();
      user.email = this.userData.email;
      user.password = this.userData.password;
      this.loading = true;
      if (user.email && user.password) {
        this.$store.dispatch('auth/logIn', user).then((success) => {
          // If the user has valid credentials get access to the platform
          if (success) {
            user.email = '';
            user.password = '';
            this.$router.push('/me');
          }
        })
          .catch((error) => {
            this.loading = false;
            this.errMessage = error.data.err;
            setTimeout(() => {
              this.loginFailed = true;
            }, 250);
            setTimeout(() => {
              this.loginFailed = false;
            }, 2000);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    goToSignUp() {
      this.$emit('goToSignup', true);
    },
  },
};
</script>

<style>

</style>
