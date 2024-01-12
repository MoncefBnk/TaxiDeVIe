<template>
  <div>
    <div class="navbar">
      <div class="logo">
        <img :src="require('@/assets/logo.png')" alt="Logo" class="logo-image" />
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </div>
      <div class="nav-links" :class="{ 'show': isMenuOpen }">
        <router-link to="/customer" @click="closeMenu">Tableau de bord</router-link>
        <router-link to="/profile" @click="closeMenu">Profil</router-link>
        <router-link to="/upcomingCustomer" @click="closeMenu">Réservation <span class="notification-badge">({{ ReservationCount }})</span></router-link>
        <router-link to="/customerHistory" @click="closeMenu"> Historique <span class="notification-badge">({{ filteredHistoryCount }})</span></router-link>
        <router-link to="#" @click="openLogoutConfirmation">Déconnexion</router-link>
      </div>

      <div class="logoutConfirmation" v-if="showLogoutConfirmation">
        <div class="logoutConfirmation-content">
          <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
          <div class="logoutConfirmation-buttons">
            <button @click="confirmLogout">Oui</button>
            <button @click="cancelLogout">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios if needed
import { auth } from '@/firebase';

export default {
  data() {
    return {
      isMenuOpen: false,
      showLogoutConfirmation: false,
      ReservationCount:0,
      filteredHistoryCount :0,

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

          // Assuming you have an API endpoint to fetch reservations
          const response = await axios.get(`https://localhost:7066/v1/api/Client/display/reservations/${userId}`);
          const history = response.data;
          const filteredHistory = history.filter(reservation => reservation.reservations_status === 3);
          this.filteredHistoryCount = filteredHistory.length;

          const Api_reponse = await axios.get(`https://localhost:7066/v1/api/Client/display/reservations/${userId}`);
          //console.log(Api_reponse);
          const reservation = Api_reponse.data;
          const FilterReservation = reservation.filter(reservation => reservation.reservations_status === 0 || reservation.reservations_status === 1||reservation.reservations_status === 2)
          //console.log(FilterReservation);
          this.ReservationCount = FilterReservation.length;
        } else {
          console.warn('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    openLogoutConfirmation() {
      this.showLogoutConfirmation = true;
    },
    confirmLogout() {
      // Implement your logout logic here
      this.$store.dispatch('logout');
      this.showLogoutConfirmation = false;
    },
    cancelLogout() {
      this.showLogoutConfirmation = false;
    },
  },
};
</script>
  
<style scoped>
.navbar {
  background-color: rgb(245, 66, 101);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
  z-index: 1;
}

.notification-badge {
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
  margin: 0 2px;
}

.logo {
  width: 40px;
  height: 40px;
}

.logo-image {
  height: 100%;
  object-fit: cover;
}

.menu-toggle {
  cursor: pointer;
  display: none;
  flex-direction: column;
}

.nav-links {
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.nav-links a,
.nav-links router-link {
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1em;
  padding: 5px;
}

@media screen and (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background-color: rgb(245, 66, 101);
  }

  .nav-links.show {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 14px;
  }
}

.logoutConfirmation {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.logoutConfirmation-content {
  background-color: rgb(245, 66, 101);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.logoutConfirmation-buttons {
  margin-top: 15px;
}

.logoutConfirmation-buttons button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
  