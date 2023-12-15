import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import BookingForm from '@/components/Customer/BookingForm.vue';
import DashBoard from '@/components/Customer/DashBoard.vue';
import ProfileCustomer from '@/components/Customer/ProfileCustomer.vue';
import FAQCompo from '@/components/FAQCompo.vue'; 
import store from '@/store'; // Import the Vuex store

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/booking', name: 'Booking', component: BookingForm, meta: { requiresAuth: true } },
  { path: '/faq', name: 'FAQ', component: FAQCompo }, 
  { path: '/profile', name: 'Profile', component: ProfileCustomer, meta : {requiresAuth: true} }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  store.dispatch('fetchUser', to).then(() => {
    next();
  });
});

export default router;
