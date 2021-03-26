import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
  },
  {
    path: '/myday',
    name: 'myday',
    component: () => import(/* webpackChunkName: "Day" */ '@/views/Day.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chain',
    name: 'chain',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Chain.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Day.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'profileInfo',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Day.vue'),
    meta: {
      requiresAuth: true
    }
  },

];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router;
