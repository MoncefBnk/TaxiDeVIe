<template>
    <div>
      <h2>Available Drivers</h2>
      <DriverList />
      <router-link to="/booking">Book a Ride</router-link>
    </div>
  </template>
  
  <script>
  import DriverList from '../components/DriverList.vue';
  
  export default {
    components: {
      DriverList,
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  