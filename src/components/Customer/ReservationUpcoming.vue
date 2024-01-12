<template>
    <div>
      <h1>Réservation</h1>
      <div v-if="filteredReservations.length === 0" class="no-reservations">Aucune réservation trouvée.</div>
      <div v-else>
        <ReservationItem v-for="reservation in filteredReservations" :key="reservation._id" :reservation="reservation" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ReservationItem from '@/components/Customer/ReservationItem.vue';
  import { auth } from '@/firebase';
  
  export default {
    data() {
      return {
        reservations: [],
        // Add a data property to store filtered reservations
        filteredReservations: [],
      };
    },
    mounted() {
      this.fetchReservations();
    },
    methods: {
    async fetchReservations() {
      try {
        // Use Firebase authentication to get the current user
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          // Use the user ID in the API request
          const response = await axios.get(`https://localhost:7066/v1/api/Client/display/reservations/${userId}`);
          this.reservations = response.data;

          // Filter reservations based on reservations_status
          this.filteredReservations = this.reservations.filter(reservation => reservation.reservations_status === 0 || reservation.reservations_status === 1);
        } else {
          console.warn('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
  },
    components: {
      ReservationItem,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
    text-align: center;
  }
  
  .no-reservations {
    margin: 20px 0;
    color: #888;
    text-align: center;
  }
  
  /* Add more styles as needed */
  </style>
  