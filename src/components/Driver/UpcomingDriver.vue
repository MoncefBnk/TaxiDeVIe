<template>
  <div>
    <NavbarDriver />
    <ReservationUpcoming />


  </div>
</template>


<script>
import NavbarDriver from '@/components/Driver/NavbarDriver.vue';
import ReservationUpcoming from '../Customer/ReservationUpcoming.vue'



export default {
  
  components: {
    NavbarDriver,
      ReservationUpcoming,

},
};
</script>

<style scoped>

</style>
