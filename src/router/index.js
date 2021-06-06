import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Me from '../views/Me.vue';
import Profile from '../views/Profile.vue';
import Archive from '../views/Archive.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthorized = store.state.auth.status.loggedIn;

  // user trying to get access to a restricted page redirected
  // if not have access come back to login page
  if (authRequired && !isAuthorized) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
