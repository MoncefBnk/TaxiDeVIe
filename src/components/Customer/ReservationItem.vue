<template>
    <div class="reservation-item">
      <p class="info"><strong>Début:</strong> {{ reservation.start_city_adress }}</p>
      <p class="info"><strong>Destination:</strong> {{ reservation.arrival_address }}</p>
      <p class="info"><strong>Date:</strong> {{ reservation.disponibility.date }}</p>
      <p class="info"><strong>Heure:</strong> {{ reservation.disponibility.heure }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      reservation: Object,
    },
  };
  </script>
  
  <style scoped>
  .reservation-item {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .info {
    margin: 8px 0;
    text-align: left;
    font-size: 14px; /* Adjust the font size as needed */
  }
  
  /* You can add more styles as needed */
  </style>