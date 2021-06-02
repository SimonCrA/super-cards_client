<template>
  <v-container>
    <v-card
      flat
    >
      <v-form
        ref="form"
        @submit.prevent="handleUpdateUser"
      >
        <v-container fluid>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|min:3|alpha"
                >
                  <v-text-field
                    v-model="userData.name"
                    label="Name"
                    :error-messages="errors"
                    required
                    placeholder="Will"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|min:2|alpha"
                >
                  <v-text-field
                    v-model="userData.lastname"
                    label="lastname"
                    :error-messages="errors"
                    required
                    placeholder="Smith"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="userData.email"
                    :error-messages="errors"
                    required
                    placeholder="a@email.com"
                    outlined
                    dense
                    label="email"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="password"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="userData.password"
                    :error-messages="errors"
                    label="Password"
                    placeholder="***"
                    type="password"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-card-actions class="flex-end">
              <v-btn
                text
                @click="resetForm"
                color="red"
              >
                clean fields
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                type="submit"
                :disabled="invalid"
              >
                update
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-container>
      </v-form>
    </v-card>
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
  name: 'ProfileEdit',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    userData: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  }),
  methods: {
    handleUpdateUser() {
      const user = new User();
      user.name = this.userData.name;
      user.lastname = this.userData.lastname;
      user.email = this.userData.email;
      user.password = this.userData.password;
      this.$store.dispatch('user/updateUserData', user).then((success) => {
        // If the user has been updated successfully, we get the new data
        if (success) {
          user.name = '';
          user.lastname = '';
          user.email = '';
          user.password = '';
        }
      })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.userData.name = '';
      this.userData.lastname = '';
      this.userData.email = '';
      this.userData.password = '';
    },
  },
};
</script>

<style>

</style>
