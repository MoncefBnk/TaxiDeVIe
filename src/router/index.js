import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';


const routes = [
  { 
    path: '/login',
    name:'Login',
    component: LoginPage 
  },
  { 
    path: '/register',
    name:'Register',
    component: RegisterPage 
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    
    component: () => import('../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  
  { path: '/forgot-password',
    name:'ForgotPassword',
    component: ForgotPasswordView },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path == '/Login' && auth.currentUser){
    next('/')
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
    next('/Login')
    return;
  }
  next();
})

export default router
