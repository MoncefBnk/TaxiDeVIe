import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from '@/firebase';

let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(store).use(router);
    // ... other configurations
    app.mount('#app');
  }

  if (user) {
    // User is authenticated, dispatch actions to set user and client info
    store.dispatch('SET_USER', user);
    store.dispatch('SET_NUMBER_CLIENT', user.uid);
    store.dispatch('fetchClientInfo', user.uid);
  }
});
