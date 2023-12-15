<template>
  <div>
    <h2 class="header">Réserver un trajet</h2>
    <form @submit.prevent="submitBooking" class="booking-form">
      <div class="form-group">
        <label for="startingPoint">Lieu de prise en charge :</label>
        <input type="text" id="startingPoint" v-model="bookingData.startingPoint" required placeholder="Entrez le lieu de prise en charge">
      </div>

      <div class="form-group arrow-container">
        <span class="arrow" @click="swapLocations">&#8593;</span>
        <span class="arrow" @click="swapLocations">&#8595;</span>
      </div>

      <div class="form-group">
        <label for="destination">Lieu de dépose :</label>
        <input type="text" id="destination" v-model="bookingData.destination" required placeholder="Entrez le lieu de dépose">
      </div>

      <button type="button" @click="searchSchedule" :disabled="!isSearchEnabled" class="search-button">Recherche</button>

      <div v-if="showSchedule" class="schedule">
        <h3>Sélectionnez un horaire :</h3>
        <ul>
          <li v-for="schedule in exampleSchedules" :key="schedule.id">
            <label>
              <input type="checkbox" v-model="selectedSchedule" :value="schedule.id">
              {{ schedule.day }} : {{ schedule.startTime }} - {{ schedule.endTime }}
            </label>
          </li>
        </ul>
      </div>

      <button v-if="selectedSchedule.length > 0" type="button" @click="confirmReservation" class="confirm-button">Confirmer la réservation</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookingData: {
        startingPoint: '',
        destination: '',
      },
      showSchedule: false,
      exampleSchedules: [
        { id: 1, day: 'Lundi', startTime: '9:00', endTime: '17:00' },
        { id: 2, day: 'Mardi', startTime: '9:00', endTime: '17:00' },
      ],
      selectedSchedule: [],
    };
  },
  computed: {
    isSearchEnabled() {
      return this.bookingData.startingPoint && this.bookingData.destination;
    },
  },
  methods: {
    submitBooking() {
      console.log('Réservation soumise :', this.bookingData, 'Horaires sélectionnés :', this.selectedSchedule);
    },
    swapLocations() {
      const temp = this.bookingData.startingPoint;
      this.bookingData.startingPoint = this.bookingData.destination;
      this.bookingData.destination = temp;
    },
    searchSchedule() {
      this.showSchedule = true; 
    },
    confirmReservation() {
      if (this.selectedSchedule.length > 0) {
        const selectedScheduleDetails = this.selectedSchedule.map(id => {
          const schedule = this.exampleSchedules.find(s => s.id === id);
          return `${schedule.day} : ${schedule.startTime} - ${schedule.endTime}`;
        }).join('\n');

        const confirmationMessage = `Réservation confirmée !\n\nHoraires sélectionnés :\n${selectedScheduleDetails}\n\nLieu de prise en charge : ${this.bookingData.startingPoint}\nLieu de dépose : ${this.bookingData.destination}`;

        window.alert(confirmationMessage);
      } else {
        window.alert('Veuillez sélectionner au moins un horaire.');
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.booking-form {
  max-width: 400px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.arrow-container {
  text-align: center;
}

.arrow {
  font-size: 24px;
  cursor: pointer;
}

.search-button,
.confirm-button {
  background-color: #4CAF50;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.search-button:hover,
.confirm-button:hover {
  background-color: #45a049;
}
</style>
