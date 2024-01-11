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
        <button v-if="this.$store.getters.userType === '1'" @click="cancelReservation" class="cancel-button">Annuler</button>
        <button v-if="this.$store.getters.userType === '2'" @click="confirmReservation" class="confirm-button">Valider</button>
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
                case 2:
                    return '✅ Terminé';
                default:
                    return '🔴 Inconnu';
            }
        },
    },
    methods: {
        async confirmReservation() {
            if (this.reservation && this.reservation.disponibility) {
                const idDisponibility = this.reservation.disponibility.id;

                try {
                    await axios.put(`https://localhost:7066/v1/api/Reservations/annuler/${idDisponibility}`);
                    console.log('Reservation successfully Confirmed!');
                    location.reload();

                } catch (error) {
                    console.error('Error confirming reservation:', error);
                }
            } else {
                console.error('Reservation or Disponibility not properly defined.');
            }
        },


        async cancelReservation() {
            if (this.reservation && this.reservation.disponibility) {
                const idDisponibility = this.reservation.disponibility.id;

                try {
                    await axios.put(`https://localhost:7066/v1/api/Reservations/annuler/${idDisponibility}`);
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
    width: 80px;
    background-color: rgb(245, 66, 101);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
}

.confirm-button {
    margin-left: auto;
    padding: 10px;
    width: 80px;
    background-color: rgb(245, 66, 101);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
}

/* You can add more styles as needed */
</style>
  