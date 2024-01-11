/* eslint-disable */
import { createStore } from 'vuex';
import router from '@/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,
    numberClient: null,
    clientInfo: {},
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.numberClient = user ? user.uid : null;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_NUMBER_CLIENT(state, numberClient) {
      state.numberClient = numberClient;
    },
    SET_CLIENT_INFO(state, clientInfo) {
      state.clientInfo = clientInfo;
    },
  },
  getters: {
    userType: (state) => state.clientInfo.userType,
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


    async fetchClientInfo({ commit }, numberClient) {
      try {
        if (numberClient !== null && numberClient !== undefined) {
          const response = await axios.get(`https://localhost:7066/v1/api/Client/${numberClient}`);
          const clientInfo = response.data;
          commit('SET_CLIENT_INFO', clientInfo);
        } else {
          console.error('Invalid numberClient:', numberClient);
        }
      } catch (error) {
        console.error('Error fetching client info:', error.message);
      }
    },

    async fetchUser({ commit, getters, dispatch }, to) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER');
          if (to && to.matched && to.matched.some(record => record.meta.requiresAuth)) {
            router.push('/login');
          }
        } else {
          commit('SET_USER', user);
          commit('SET_NUMBER_CLIENT', user.uid);
    
          // Fetch additional user data (userType) from MongoDB
          await dispatch('fetchClientInfo', user.uid);
    
          const userType = getters.userType;
    
          // Redirect logic based on user type
          if (userType === '1' && to && ['Driver', 'ProfileDriver', 'Upcoming', 'Approval', 'driverHistory'].includes(to.name)) {
            router.push({ name: 'Customer' });
          } else if (userType === '2' && to && ['Profile', 'customerHistory', 'booking', 'customer'].includes(to.name)) {
            router.push({ name: 'Driver' });
          }
    
          // Redirect to default page for Login, ForgotPassword, Home, and Register
          if (router.isReady() && to && to.name && (to.name === 'Login' || to.name === 'ForgotPassword' || to.name === 'Home' || to.name === 'Register')) {
            router.push({ name: userType === '1' ? 'Customer' : 'Driver' });
          }
        }
      });
    },


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