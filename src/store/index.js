import { createStore } from 'vuex';
import router from '@/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import axios from 'axios';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        commit('SET_USER', auth.currentUser);
        router.push('/customer');
      } catch (error) {
        handleAuthError(error);
      }
    },

    async register({ commit }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        commit('SET_USER', auth.currentUser);
        router.push('/customer');
      } catch (error) {
        handleAuthError(error);
      }
    },

    async registerUserWithAPI({ commit }, userData) {
      try {
        
        await axios.post('https://localhost:7066/v1/api/Client', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        
        commit('SET_USER', auth.currentUser);
        router.push('/customer');
      } catch (error) {
        console.error('Error registering user with API:', error.message);
        
        
      }
    },

    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
      router.push('/');
    },

    async fetchUser({ commit }, to) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER');
          if (to && to.matched && to.matched.some(record => record.meta.requiresAuth)) {
            router.push('/login');
          }
        } else {
          commit('SET_USER', user);
        
          if (router.isReady() && to && to.name === 'Login') {
            router.push({ name: 'Customer' });
          }
        }
      });
    }
  }
});
   
function handleAuthError(error) {
  const errorMessages = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong Password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-email': 'Invalid email',
    'auth/weak-password': 'Weak Password',
  };

  const defaultMessage = 'Something went wrong';
  const errorMessage = errorMessages[error.code] || defaultMessage;

  alert(errorMessage);
}