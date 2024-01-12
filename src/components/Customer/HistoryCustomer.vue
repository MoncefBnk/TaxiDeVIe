<template>
  <div>
    <NavbarCustomer />
    <ReservationHistory />


  </div>
</template>
  
  
<script>
import NavbarCustomer from '@/components/Customer/NavbarCustomer.vue';
import ReservationHistory from '../Customer/ReservationHistory.vue'



export default {

  components: {
    NavbarCustomer,
    ReservationHistory,

  },
};
</script>
  
<style scoped></style>
  