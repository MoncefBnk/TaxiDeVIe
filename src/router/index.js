import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ForgotPasswordView from '@/components/Home/ForgotPasswordView.vue';
import LoginPage from '../components/Home/LoginPage.vue';
import RegisterPage from '../components/Home/RegisterPage.vue';
import BookingForm from '@/components/Customer/BookingForm.vue';
import ProfileCustomer from '@/components/Customer/ProfileCustomer.vue';
import ProfileDriver from '@/components/Driver/ProfileDriver.vue';
import FAQCompo from '@/components/Home/FAQCompo.vue'; 
import CustomerView from '../views/CustomerView.vue'; 
import DriverView from '../views/DriverView.vue'; 
import HistoryDriver from '@/components/Driver/HistoryDriver.vue';
import HistoryCustomer from '@/components/Customer/HistoryCustomer.vue';
import ApprovalDriver from '@/components/Driver/ApprovalDriver.vue';
import UpcomingDriver from '@/components/Driver/UpcomingDriver.vue';
import UpcomingCustomer from '@/components/Customer/UpcomingCustomer.vue';
import confirmReservations from'../components/Customer/confirmReservations.vue';
import LoadingPage from '@/components/Shared/LoadingPage.vue'
import store from '@/store'; // Import the Vuex store

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/Confirmation-Reservation', name: 'Reservations', component: confirmReservations },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/customer', name: 'Customer', component: CustomerView, meta: { requiresAuth: true } },
  { path: '/booking', name: 'Booking', component: BookingForm, meta: { requiresAuth: true } },
  { path: '/driverHistory', name: 'driverHistory', component: HistoryDriver, meta: { requiresAuth: true } },
  { path: '/customerHistory', name: 'customerHistory', component: HistoryCustomer, meta: { requiresAuth: true } },
  { path: '/approval', name: 'Approval', component: ApprovalDriver, meta: { requiresAuth: true } },
  { path: '/upcomingDriver', name: 'UpcomingDriver', component: UpcomingDriver, meta: { requiresAuth: true } },
  { path: '/upcomingCustomer', name: 'UpcomingCustomer', component: UpcomingCustomer, meta: { requiresAuth: true } },
  { path: '/faq', name: 'FAQ', component: FAQCompo }, 
  { path: '/profile', name: 'Profile', component: ProfileCustomer, meta : {requiresAuth: true} },
  { path: '/loading', name: 'Loading', component: LoadingPage, meta : {requiresAuth: true} },
  { path: '/profileDriver', name: 'ProfileDriver', component: ProfileDriver, meta : {requiresAuth: true} },
  { path: '/driver', name: 'Driver', component: DriverView, meta : {requiresAuth: true} },  
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
