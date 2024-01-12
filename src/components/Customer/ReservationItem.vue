<!-- ReservationItem.vue -->
<template>
    <div class="reservation-item">
        <div class="info-container">
            <p class="info"><strong>Début:</strong> {{ reservation.start_city_adress }}</p>
            <p class="info"><strong>Destination:</strong> {{ reservation.arrival_address }}</p>
            <p class="info"><strong>Date:</strong> {{ reservation.disponibility.date }} <strong>&nbsp; Heure:</strong> {{
                reservation.disponibility.heure }}</p>
            <p class="info"><strong>Status:</strong> {{ statusText }}</p>
        </div>
        <button @click="cancelReservation" class="cancel-button">Annuler</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        reservation: Object,
    },
    computed: {
      statusText() {
        switch (this.reservation.reservations_status) {
          case 0:
            return '⏳ En attente de validation';
          case 1:
            return '✅ Reservation acceptée';
          case 2:
            return '✅ client arrivé à destination';
          default:
            return '🔴 Inconnu';
        }
      },
    },
    methods: {
        async cancelReservation() {
  if (this.reservation && this.reservation.disponibility ) {
    const id_reservations = this.reservation.id;

    try {
      // Make the DELETE request to your API endpoint
      await axios.put(`https://localhost:7066/v1/api/Reservations/annuler/${id_reservations}`);
      
      // Optionally, you can update your component state or perform any other actions after successful deletion
      console.log('Reservation successfully canceled!');
      location.reload();

                } catch (error) {
                    console.error('Error canceling reservation:', error);
                }
            } else {
                console.error('Reservation or Disponibility not properly defined.');
            }
        },

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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.info {
    margin: 8px 0;
    text-align: left;
    font-size: 14px;
    /* Adjust the font size as needed */
}

.cancel-button {
    margin-left: auto;
    padding: 10px;
    background-color: #ff6666;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
}

/* You can add more styles as needed */
</style>
  