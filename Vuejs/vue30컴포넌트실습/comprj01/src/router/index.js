import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/3103',
    name: '3103',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3103View.vue'),
  },
  {
    path: '/3104',
    name: '3104',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3104View.vue'),
  },
  {
    path: '/3403',
    name: '3403',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3403View.vue'),
  },
  {
    path: '/34ex',
    name: '34ex',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue34exView.vue'),
  },
  {
    path: '/3701',
    name: '3701',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3701View.vue'),
  },
  {
    path: '/image-slider',
    name: 'image-slider',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Vue3801ImageSliderView.vue'
      ),
  },
  {
    path: '/4301',
    name: '4301',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Page4301View.vue'),
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../views/TodoView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
