<template>
  <div class="dashboard-container">
    <div class="navbar" :class="{ 'responsive': isResponsive }">
      <div class="toggle-btn" @click="toggleResponsive">☰</div>
      <router-link v-show="isResponsive" to="/dashboard" @click="toggleResponsive">Dashboard</router-link>
      <router-link v-show="isResponsive" to="/profile" @click="toggleResponsive">Profile</router-link>
      <router-link v-show="isResponsive" to="/settings" @click="toggleResponsive">Settings</router-link>
      <button v-show="isResponsive" @click="$store.dispatch('logout')">Logout</button>
    </div>

    <div class="main-content">
      <h1>Welcome to the Dashboard!</h1>
      <BookingForm />
    </div>
  </div>
</template>

<script>
import BookingForm from '@/components/Customer/BookingForm.vue';

export default {
  components: {
    BookingForm,
  },
  data() {
    return {
      isResponsive: false,
    };
  },
  methods: {
    toggleResponsive() {
      this.isResponsive = !this.isResponsive;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  background-color: #ff355e;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-right: 10px;
  display: none; 
}

.toggle-btn {
  font-size: 30px;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 20px;
}

@media screen and (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .toggle-btn {
    order: -1; 
  }

  .navbar a {
    display: block; 
  }
}
</style>
