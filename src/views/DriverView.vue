<template>
    <div>
      <NavbarDriver />
      <ApprovalDriver />
      <HistoryDriver />
      <UpcomingDrive />
    </div>
  </template>
  
  
  <script>
  import NavbarDriver from '@/components/Driver/NavbarDriver.vue';
  import ApprovalDriver from '@/components/Driver/ApprovalDriver.vue';
  import HistoryDriver from '@/components/Driver/HistoryDriver.vue';
  import UpcomingDrive from '@/components/Driver/UpcomingDrive.vue';

  
  export default {
    components: {
      NavbarDriver,
      ApprovalDriver,
      HistoryDriver,
      UpcomingDrive,
  },
  };
  </script>
  
  <style scoped>
  
  </style>
  