import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import BookingForm from '@/components/BookingForm.vue';
import DashBoard from '@/components/DashBoard.vue';
import store from '@/store'; // Import the Vuex store

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/booking', name: 'Booking', component: BookingForm, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Use router.beforeEach to fetch user before each navigation
router.beforeEach((to, from, next) => {
  store.dispatch('fetchUser', to).then(() => {
    next();
  });
});

export default router;
