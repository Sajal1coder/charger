import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/Login.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ChargerList from '../components/ChargerList.vue';
import ChargerMap from '../components/ChargerMap.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/chargers', component: ChargerList },
  { path: '/map', component: ChargerMap },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 