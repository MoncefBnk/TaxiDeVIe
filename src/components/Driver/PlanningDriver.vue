<template>
  <div>
    <NavbarDriver />
    <div class="calendar-container" style="margin-top: 20px;">
      <div class="calendar">
        <div class="header">
          <button @click="prevMonth" :disabled="isPrevMonthDisabled">&lt;</button>
          <h2>{{ currentMonth }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days">
          <div v-for="day in calendarDays" :key="day.date" @click="toggleDate(day.date)"
            :class="{ 'day': true, 'empty': day.isEmpty, 'selected': isSelected(day.date), 'disabled': day.isDisabled }">
            {{ day.isEmpty ? '' : day.dayOfMonth }}
            <span v-if="day.savedInfo !== undefined" class="saved-info">{{ day.savedInfo }}</span>
          </div>
        </div>
      </div>

      <div class="selected-info">
        <h3>Informations Sélectionnées :</h3>
        <p>Date : {{ selectedDates.map(date => formatDate(date)).join(', ') }}</p>
        <label for="timeInput">Heure :</label>
        <input type="time" id="timeInput" v-model="selectedTime" @change="handleTimeChange">
        <button class="save-button" @click="saveData">Sauvegarder</button>
      </div>
    </div>
  </div>
</template>


<script>
import NavbarDriver from '@/components/Driver/NavbarDriver.vue';
import { auth } from '@/firebase';
import axios from 'axios';

export default {
  components: {
    NavbarDriver,
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDates: [],
      selectedTime: "",
      savedData: [],
    };
  },
  computed: {
    currentMonth() {
      const months = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
        'septembre', 'octobre', 'novembre', 'décembre',
      ];
      return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    },
    calendarDays() {
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const days = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        const savedInfo = this.getSavedInfo(date);
        days.push({
          date,
          dayOfMonth: day,
          isEmpty: false,
          isDisabled: date < firstDayOfMonth,
          savedInfo: savedInfo !== undefined ? `Saved: ${savedInfo.info}` : undefined,
        });
      }

      return days;
    },
    isPrevMonthDisabled() {
      const today = new Date();
      return this.currentDate <= new Date(today.getFullYear(), today.getMonth(), 1);
    },
  },
  methods: {
    toggleDate(date) {
  const index = this.selectedDates.findIndex(selectedDate => this.isSameDay(selectedDate, new Date(date)));

  if (index === -1) {
    this.selectedDates.push(new Date(date));
  } else {
    this.selectedDates.splice(index, 1);
  }
},

isSelected(date) {
  return this.selectedDates.some(selectedDate => this.isSameDay(selectedDate, new Date(date)));
},
    isSameDay(date1, date2) {
      return (
        date1 &&
        date2 &&
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    },
    prevMonth() {
      if (!this.isPrevMonthDisabled) {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() +1, 1);
      }
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('fr-FR', options);
    },
    async saveData() {
      const user = auth.currentUser;
      //console.log(user);
      // Logique de sauvegarde des données
      const dataToSave = {
        dates: [...this.selectedDates],
        time: this.selectedTime,
      };
      this.savedData.push(dataToSave);
      console.log(dataToSave);
      // Effacer les sélections actuelles après la sauvegarde
      this.selectedDates = [];
      this.selectedTime = ""; // Clear selected time

      // Mise à jour des données sauvegardées sur le calendrier
      this.showSavedData();
      const id = user.reloadUserInfo.localId
      console.log(dataToSave);
      const y = await axios.get("https://localhost:7066/v1/api/Disponibility");
      const AllDisponibility = dataToSave.dates.map(item => {
  const year = item.getUTCFullYear();
  const month = ('0' + (item.getUTCMonth() + 1)).slice(-2);
const day = ('0' + (item.getUTCDate() + 1)).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;

  return {
    "id_disponibility": y.data.length + 1,
    "date": formattedDate,
    "heure": dataToSave.time,
    "id_driver": id
  };
});
console.log(AllDisponibility)
      await axios.post("https://localhost:7066/v1/api/Disponibility/AddListeDisponibility", AllDisponibility);

    },
    getSavedInfo(date) {
      return this.savedData.find(savedItem => this.isSameDay(savedItem.dates[0], date));
    },
    showSavedData() {
  // Afficher les données sauvegardées sur le calendrier
  this.savedData.forEach(savedItem => {
    savedItem.dates.forEach(date => {
      const dayElement = this.calendarDays.find(day => this.isSameDay(day.date, date));

      if (dayElement) {
        dayElement.savedInfo = `${savedItem.time}`; // Display saved time
        dayElement.selectedTime = savedItem.time; // Set selectedTime property for the day
      }
    });
  });
},

    handleTimeChange() {
      // Handle time change if needed
    },
  },
};
</script>


<style scoped>
.save-button {
  color: white;
  /* Set the text color for the "Sauvegarder" button */
  background-color: green;
  /* Set the background color for the "Sauvegarder" button */
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 4px;
}

.saved-info {
  font-weight: bold;
  color: #5384b7;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-inline: 15px;
}

.calendar {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
  width: 70%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(245, 66, 101);
  color: #fff;
  padding: 10px;
}

button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  outline: none;
}

h2 {
  margin: 0;
  font-size: 1rem;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 5px;
}

.day {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.day:hover {
  background-color: rgba(194, 98, 98, 0.5);
}

.selected {
  background-color: rgb(245, 66, 101);
  color: #fff;
}

.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.selected-info {
  margin-top: 20px;
}

.selected-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.selected-info p {
  margin: 0;
}

@media screen and (max-width: 600px) {
  .calendar {
    width: 100%;
  }

  .header {
    text-align: center;
  }

  button {
    margin: 5px;
  }

  .days {
    grid-template-columns: repeat(7, 1fr);
  }

  .day {
    font-size: 12px;
  }
}
</style>
