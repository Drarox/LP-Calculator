import { createRouter, createWebHistory } from 'vue-router';
import CalculatorView from '../views/CalculatorView.vue';

const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: CalculatorView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
