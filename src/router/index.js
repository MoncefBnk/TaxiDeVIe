import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginPage from '../components/Home/LoginPage.vue';
import RegisterPage from '../components/Home/RegisterPage.vue';
import BookingForm from '@/components/Customer/BookingForm.vue';
import ProfileCustomer from '@/components/Customer/ProfileCustomer.vue';
import FAQCompo from '@/components/Home/FAQCompo.vue'; 
import CustomerView from '../views/CustomerView.vue'; 
import store from '@/store'; // Import the Vuex store

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/customer', name: 'Customer', component: CustomerView, meta: { requiresAuth: true } },
  { path: '/booking', name: 'Booking', component: BookingForm, meta: { requiresAuth: true } },
  { path: '/faq', name: 'FAQ', component: FAQCompo }, 
  { path: '/profile', name: 'Profile', component: ProfileCustomer, meta : {requiresAuth: true} }, 
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
