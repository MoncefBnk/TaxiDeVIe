<template>
    <div>
      <NavbarAdmin />
      <ReservationUpcoming />
  
  
    </div>
  </template>
  
  
  <script>
import NavbarAdmin from '@/components/Admin/NavbarAdmin.vue';
import ReservationUpcoming from '../Shared/ReservationUpcoming.vue'
  
  
  
  export default {
    
    components: {
        NavbarAdmin,
        ReservationUpcoming,
  },
  };
  </script>
  
  <style scoped>
  
  </style>
  