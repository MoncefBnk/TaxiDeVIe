import { createStore } from 'vuex';
import router from '@/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase';

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
        router.push('/dashboard');
      } catch (error) {
        handleAuthError(error);
      }
    },

    async register({ commit }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        commit('SET_USER', auth.currentUser);
        router.push('/dashboard');
      } catch (error) {
        handleAuthError(error);
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
            router.push({ name: 'Dashboard' });
          }
        }
      });
    }
  }
});
   
function handleAuthError(error) {
  switch (error.code) {
    case 'auth/user-not-found':
      alert('User not found');
      break;
    case 'auth/wrong-password':
      alert('Wrong Password');
      break;
    case 'auth/email-already-in-use':
      alert('Email already in use');
      break;
    case 'auth/invalid-email':
      alert('Invalid email');
      break;
    case 'auth/weak-password':
      alert('Weak Password');
      break;
    default:
      alert('Something went wrong');
  }
}