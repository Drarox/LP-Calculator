import { createRouter, createWebHistory } from 'vue-router';
import ConcentratedView from '../views/ConcentratedView.vue';
import ClassicView from '../views/ClassicView.vue';
import AprView from '../views/AprView.vue';
import PositionTrackerView from '../views/PositionTrackerView.vue';

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
  },
  {
    path: '/apr',
    name: 'APR',
    component: AprView
  },
  {
    path: '/tracker',
    name: 'Position Tracker',
    component: PositionTrackerView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
