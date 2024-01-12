<template>
  <div>
    <NavbarDriver />
    <HistoryDisplay/>


  </div>
</template>


<script>
import NavbarDriver from '@/components/Driver/NavbarDriver.vue';
import HistoryDisplay from '@/components/Shared/HistoryDisplay.vue'



export default {
  components: {
    NavbarDriver,
    HistoryDisplay,

  },
};
</script>

<style scoped></style>
