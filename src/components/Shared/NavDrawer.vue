<template>
  <v-navigation-drawer
    v-if="user.length !== 0 "
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app>
    <v-list-item
      class="px-2"
      link
      @click="goToHome"
    >
      <v-list-item-avatar>
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>{{user[0].name}} {{user[0].lastname}}</v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <router-link :to="item.title" class="nav-link">
            <v-icon class="icon">{{ item.icon }}</v-icon>
          </router-link>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
      >
        <v-list-item-icon>
          <v-icon class="link-exit" @click="exit">mdi-logout-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavDrawer',
  data: () => ({
    drawer: true,
    items: [
      { title: 'profile', icon: 'mdi-account-cog' },
      { title: 'archive', icon: 'mdi-package-down' },
    ],
    mini: true,
  }),
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    goToHome() {
      const path = '/me';
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    exit() {
      if (this.$store.state.auth.status.loggedIn) {
        this.$store.dispatch('auth/logOut').then(() => {
          this.$router.push('/');
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  text-decoration: none;
}
.nav-link .icon:hover {
  color: rgb(58, 9, 138);
}
.nav-link.router-link-active  .icon{
  color: rgb(36, 5, 87);
}

.link-exit {
  text-decoration: none;
}
.link-exit:hover {
  color: rgb(58, 9, 138);
}
</style>
