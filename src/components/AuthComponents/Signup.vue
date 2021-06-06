<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="true" justify-center="true">
      <v-flex class="login-form text-center">
        <div class="display-2 mb-5">
          <v-icon class="mr-2" large="large">mdi-cards</v-icon> Cards
        </div>
        <v-card elevation="20">
          <v-card-text>
            <div class="subheading">
              Crate a new account
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
                v-if="signupFailed"
              >email already registered!</v-alert>
            </v-scroll-x-transition>
            <validation-observer v-slot="{ handleSubmit, invalid }" ref="form">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <validation-observer v-if="currentStep === 1">
                    <v-alert
                      class="mt-4"
                      color="blue"
                      dense
                      text
                    >Step 1</v-alert>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Name"
                      rules="required|min:2|alpha"
                    >
                      <v-text-field
                        v-model="userData.name"
                        :error-messages="errors"
                        label="Name"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Lastname"
                      rules="required|min:3|alpha"
                    >
                      <v-text-field
                        v-model="userData.lastname"
                        :error-messages="errors"
                        label="Lastname"
                        required
                      ></v-text-field>
                    </validation-provider>
                </validation-observer>
                <validation-observer v-else-if="currentStep === 2">
                  <v-alert
                    class="mt-4"
                    color="blue"
                    dense
                    text
                  >Step 2</v-alert>
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="userData.email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|min:8"
                  >
                    <v-text-field
                      v-model="userData.password"
                      :error-messages="errors"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                  </validation-provider>
                </validation-observer>
                <!-- eslint-disable-next-line max-len -->
                <v-btn  color="primary" class="mr-3 mt-4" type="button" @click="goToStep('sub')" v-if="currentStep > 1">
                  Previous
                </v-btn>
                <!-- eslint-disable-next-line max-len -->
                <v-btn color="primary" class="mt-4" type="button" @click="goToStep('add')" :disabled="invalid">
                  {{ currentStep === 2 ? 'Submit' : 'Next' }}
                </v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
        <div class="mt-4">Do you already have an account?
          <v-btn text class="ml-3" color="primary" @click="goToLogIn">log In</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  required, email, min, alpha,
} from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
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

extend('min', {
  ...min,
  message: '{_field_} must be 3 alphaNumerics characters min',
});

extend('alpha', {
  ...alpha,
  message: '{_field_} must be only alpha characters',
});
export default {
  name: 'Signup',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    userData: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    loading: false,
    signupFailed: false,
    currentStep: 1,
  }),
  methods: {
    goToStep(operation) {
      if (operation === 'add') {
        this.currentStep += 1;
      } else if (operation === 'sub') {
        this.currentStep -= 1;
      }

      if (this.currentStep < 1) {
        this.currentStep = 0;
      } else if (this.currentStep > 2) {
        this.currentStep = 2;
        this.onSubmit();
      }
    },
    onSubmit() {
      if (this.currentStep === 2) {
        this.loading = true;
        const user = new User();
        user.name = this.userData.name;
        user.lastname = this.userData.lastname;
        user.email = this.userData.email;
        user.password = this.userData.password;

        this.$store.dispatch('auth/register', user).then((success) => {
          if (success) {
            user.name = '';
            user.lastname = '';
            user.email = '';
            user.password = '';
            console.log(success);
            this.$router.push('/me');
          }
        })
          .catch((error) => {
            if (error.data.err.email) {
              this.loading = false;
              setTimeout(() => {
                this.signupFailed = true;
              }, 255);
              setTimeout(() => {
                this.signupFailed = false;
              }, 2000);
            }
          })
          .finally(() => {
            this.loading = false;
            user.name = '';
            user.lastname = '';
            user.email = '';
            user.password = '';
          });
      }
    },
    goToLogIn() {
      this.$emit('goToLogin', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 400px
}
</style>
