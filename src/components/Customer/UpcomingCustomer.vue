<template>
    <div>
      <NavbarCustomer />
      <ReservationUpcoming />
  
  
    </div>
  </template>
  
  
  <script>
import NavbarCustomer from '@/components/Customer/NavbarCustomer.vue';
import ReservationUpcoming from '../Shared/ReservationUpcoming.vue'
  
  
  
  export default {
    
    components: {
        NavbarCustomer,
        ReservationUpcoming,
  
  },
  };
  </script>
  
  <style scoped>
  
  </style>
  