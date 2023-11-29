<template>
  <div>
    <h2>Book a Ride</h2>
    <form @submit.prevent="submitBooking" class="booking-form">
      <div class="form-group">
        <label for="startingPoint">Starting Point:</label>
        <input type="text" id="startingPoint" v-model="bookingData.startingPoint" required>
      </div>

      <div class="form-group arrow-container">
        <span class="arrow" @click="swapLocations">&#8593;</span>
        <span class="arrow" @click="swapLocations">&#8595;</span>
      </div>

      <div class="form-group">
        <label for="destination">Destination:</label>
        <input type="text" id="destination" v-model="bookingData.destination" required>
      </div>

      <div class="form-group">
        <button
          type="button"
          @click="toggleGo('goNow')"
          :class="{ active: bookingData.goNow }"
        >
          Go Now
        </button>

        <button
          type="button"
          @click="toggleGo('goLater')"
          :class="{ active: bookingData.goLater }"
        >
          Go Later
        </button>
      </div>

      <div v-if="bookingData.goLater" class="form-group">
  <label for="date">Date:</label>
  <input type="date" id="date" v-model="bookingData.date" style="width: 50%;">
  
  <label for="hour">Hour:</label>
  <input type="number" id="hour" v-model="bookingData.hour" min="0" max="23" style="flex: 1; margin-right: 0.5em;">
  
  <label for="minute">Minute:</label>
  <input type="number" id="minute" v-model="bookingData.minute" min="0" max="59" style="flex: 1; margin-right: 0.5em;">
</div>
      <button type="submit">Book Now</button>
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
        goNow: false,
        goLater: false,
        date: '',
        hour: 0,
        minute: 0,
      },
    };
  },
  methods: {
    submitBooking() {
      console.log('Booking submitted:', this.bookingData);
    },
    toggleGo(type) {
      this.bookingData.goNow = type === 'goNow';
      this.bookingData.goLater = type === 'goLater';
    },
    swapLocations() {
      const temp = this.bookingData.startingPoint;
      this.bookingData.startingPoint = this.bookingData.destination;
      this.bookingData.destination = temp;
    },
  },
};
</script>

<style scoped>
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5em;
}

.arrow {
  font-size: 24px;
  cursor: pointer;
}
.booking-form {
  max-width: 500px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #f2f2f2, #ffffff);
}

.form-group {
  display: flex;
  margin-bottom: 1em;
  align-items: center;
}

.form-group input {
  box-sizing: border-box;
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #333;
  color: white;
  padding: 0.8em;
  cursor: pointer;
  width: 48%;
  border: none;
  border-radius: 4px;
  margin-right: 2%;
}
button.active {
  background-color: #555;
}

button:last-child {
  margin-right: 0;
}
</style>