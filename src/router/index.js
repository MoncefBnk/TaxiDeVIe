import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginPage from '../components/Home/LoginPage.vue';
import RegisterPage from '../components/Home/RegisterPage.vue';
import ForgotPasswordView from '@/components/Home/ForgotPasswordView.vue';
import ProfileCustomer from '@/components/Customer/ProfileCustomer.vue';
import ProfileDriver from '@/components/Driver/ProfileDriver.vue';
import FAQCompo from '@/components/Home/FAQCompo.vue';
import CustomerView from '../views/CustomerView.vue';
import DriverView from '../views/DriverView.vue';
import AdminView from '../views/AdminView.vue';
import AddDriver from '@/components/Admin/AddDriver.vue'
import BookingForm from '@/components/Customer/BookingForm.vue';
import ApprovalDriver from '@/components/Driver/ApprovalDriver.vue';
import HistoryDriver from '@/components/Driver/HistoryDriver.vue';
import HistoryCustomer from '@/components/Customer/HistoryCustomer.vue';
import confirmReservations from '@/components/Customer/ConfirmReservations.vue';
import UpcomingDriver from '@/components/Driver/UpcomingDriver.vue';
import PlanningDriver from '@/components/Driver/PlanningDriver.vue';
import confirmReservations from'../components/Customer/confirmReservations.vue';
import LoadingPage from '@/components/Shared/LoadingPage.vue'
import store from '@/store'; // Import the Vuex store

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/driver', name: 'Driver', component: DriverView, meta: { requiresAuth: true } },
  { path: '/customer', name: 'Customer', component: CustomerView, meta: { requiresAuth: true } },
  { path: '/admin', name: 'Admin', component: AdminView, meta: { requiresAuth: true } },
  { path: '/Confirmation-Reservation', name: 'Reservations', component: confirmReservations },
  { path: '/booking', name: 'Booking', component: BookingForm, meta: { requiresAuth: true } },
  { path: '/addDriver', name: 'AddDriver', component: AddDriver, meta: { requiresAuth: true } },
  { path: '/driverHistory', name: 'DriverHistory', component: HistoryDriver, meta: { requiresAuth: true } },
  { path: '/customerHistory', name: 'CustomerHistory', component: HistoryCustomer, meta: { requiresAuth: true } },
  { path: '/approval', name: 'Approval', component: ApprovalDriver, meta: { requiresAuth: true } },
  { path: '/upcoming', name: 'Upcoming', component: UpcomingDriver, meta: { requiresAuth: true } },
  { path: '/faq', name: 'FAQ', component: FAQCompo }, 
  { path: '/profile', name: 'Profile', component: ProfileCustomer, meta : {requiresAuth: true} },
  { path: '/loading', name: 'Loading', component: LoadingPage, meta : {requiresAuth: true} },
  { path: '/profileDriver', name: 'ProfileDriver', component: ProfileDriver, meta : {requiresAuth: true} },
  { path: '/driver', name: 'Driver', component: DriverView, meta : {requiresAuth: true} },  
  { path: '/planning', name: 'Planning', component: PlanningDriver, meta : {requiresAuth: true} },  
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
