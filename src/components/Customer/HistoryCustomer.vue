<template>
  <div>
    <NavbarCustomer />
    <HistoryDisplay/>


  </div>
</template>
  
  
<script>
import NavbarCustomer from '@/components/Customer/NavbarCustomer.vue';
import HistoryDisplay from '@/components/Shared/HistoryDisplay.vue'



export default {

  components: {
    NavbarCustomer,
    HistoryDisplay,

  },
};
</script>
  
<style scoped></style>
  