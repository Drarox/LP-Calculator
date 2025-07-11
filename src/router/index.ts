import { createRouter, createWebHistory } from 'vue-router';
import ConcentratedView from '../views/ConcentratedView.vue';
import ClassicView from '../views/ClassicView.vue';

const routes = [
  {
    path: '/',
    name: 'Concentrated',
    component: ConcentratedView
  },
  {
    path: '/classic',
    name: 'Classic',
    component: ClassicView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
