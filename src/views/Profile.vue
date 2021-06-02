<template>
  <v-container>
    <v-nav-drawer></v-nav-drawer>
    <v-card color="basil" class="mt-9">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">
          Hi, {{user[0].name}} {{user[0].lastname}}.
        </h1>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
          class=""
        >
          <v-profile-view v-if="item === 'See Profile'"></v-profile-view>
          <v-profile-edit v-if="item === 'Edit Profile'"></v-profile-edit>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import NavDrawer from '../components/Shared/NavDrawer.vue';
import ProfileEdit from '../components/ProfileComponents/ProfileEdit.vue';
import ProfileView from '../components/ProfileComponents/ProfileView.vue';

export default {
  name: 'Profile',
  components: {
    'v-nav-drawer': NavDrawer,
    'v-profile-edit': ProfileEdit,
    'v-profile-view': ProfileView,
  },
  data: () => ({
    tab: null,
    items: [
      'See Profile', 'Edit Profile',
    ],
  }),
  computed: {
    ...mapState('user', ['user']),
  },
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
