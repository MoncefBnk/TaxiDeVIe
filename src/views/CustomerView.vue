<template>
    <div>
      <NavbarCustomer />
      <BookingForm />
    </div>
  </template>
  
  <script>
  import NavbarCustomer from '@/components/Customer/NavbarCustomer.vue';
  import BookingForm from '@/components/Customer/BookingForm.vue';
  
  export default {
    components: {
      NavbarCustomer,
      BookingForm,
    },
  };
  </script>
  
  <style scoped>
</style>
