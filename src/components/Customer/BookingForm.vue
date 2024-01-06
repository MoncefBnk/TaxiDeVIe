<template>
  <div class="form-container">
    <h1>Où allons-nous?</h1>
    <div class="form-content">
      <div v-if="currentPage === 0" class="step-content">
        <h2>Étape 1: Informations sur le lieu</h2>
        <div class="form-group">
          <label>adresse de départ</label>
          <input type="text" required list="adresse" v-model="lieuDePriseEnCharge"
            @input="onAddressInputChange(this.lieuDePriseEnCharge)">
          <datalist id="adresse">
            <option v-for="(city, index) in this.AllAdresse" :key="index">{{ city }}</option>
          </datalist>
        </div>
        <div class="form-group">
          <label>adresse d'arrivée</label>
          <input type="text" list="adresselist" v-model="lieuDeDepose" required
            @input="onAddressInputChange(this.lieuDeDepose)">
          <datalist id="adresselist">
            <option v-for="(city, index) in this.AllAdresse" :key="index">{{ city }}</option>
          </datalist>
        </div>
      </div>

      <div v-if="currentPage === 1" class="step-content">
        <h2>Étape 2: Informations sur le temps</h2>
        <div class="form-group">
          <label>Date de départ</label>
          <input type="date" v-model="departureDate" required>
        </div>
        <div class="form-group">
          <label>Heure de départ</label>
          <input type="time" v-model="departureTime" required>
        </div>
      </div>
      <div v-if="currentPage === 2" class="step-content">
        <h2>Étape 3: Informations sur la capacité</h2>
        <div class="form-group">
          <label>Nombre de personnes</label>
          <div class="seat-buttons">
            <div v-for="count in [1, 2, 3, 4]" :key="count" class="seat-button">
              <button @click="selectNumberOfPersons(count)" :class="{ 'selected': numberOfPersons === count }">
                {{ count }} Personne{{ count > 1 ? 's' : '' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentPage === 3" class="step-content">
        <h2>Étape 4: choix du créneau </h2>
        <div v-for="(slots, dateUnique) in this.AllDisponibility" :key="dateUnique">
          <p> {{ new Date(dateUnique).toLocaleDateString(
            'fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        ) }}</p>
          <ul>
            <li v-for="slot in slots" :key="slot.id_disponibility">
              {{ slot.heure }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="currentPage === 4" class="step-content">
        <h2>Étape 5: Carte et Réservation</h2>
      </div>

      <div class="btn-group">
        <button v-if="currentPage > 0" @click="goToPage(currentPage - 1)" class="btn">Précédent</button>
        <button v-if="currentPage < steps.length - 1" @click="goToPage(currentPage + 1)" class="btn">Suivant</button>
        <button v-if="currentPage === steps.length - 1" @click="reserver" class="btn">Réserver</button>
      </div>
    </div>

    <div class="progress-dots">
      <div v-for="(step, index) in steps" :key="index" class="dot" :class="{ 'active': index === currentPage }"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
export default {
  data() {
    return {
      lieuDePriseEnCharge: '',
      lieuDeDepose: '',
      departureTime: '',
      companionName: '',
      companionAge: '',
      numberOfPersons: 1,
      departureDate: '',
      currentPage: 0,
      AllAdresse: ref([]),
      AllDisponibility: ref([]),
      steps: ['Emplacement', 'Temps', 'Compagnon', 'Capacité', 'Carte & Réservation'],
    };
  },
  methods: {
    // Fonction pour récupérer les horaires depuis MongoDB
    // async fetchScheduleFromMongo() {
    //   try {
    //     // Faire un appel asynchrone pour récupérer les horaires depuis MongoDB
    //     const response = await yourApiCallToGetSchedule();  // remplacez par API de namory

    //     // Mettre à jour l'état du composant en fonction de l'horaire récupéré
    //     this.departureDate = response.departureDate;
    //     this.departureTime = response.departureTime;
    //   } catch (error) {
    //     console.error('Erreur lors de la récupération de l\'horaire :', error);
    //   }
    // },
    async getDisponibility(numberpeople, departureTime, departureDate) {
      try {
        const apiDisponibility = await axios.get(`https://localhost:7066/v1/api/Reservations/${numberpeople}/${departureTime}/${departureDate}`);
        const Disponibility = apiDisponibility.data.map(x => ({
          "id_disponibility": x.id_disponibility,
          "date": x.date,
          "heure": x.heure,
        }));
        this.AllDisponibility = computed(() => {
          const creneauxDispo = {};
          Disponibility.map(x => {
            const date_unique = x.date;
            if (!creneauxDispo[date_unique]) {
              creneauxDispo[date_unique] = [];
            }
            creneauxDispo[date_unique].push({
              "id_disponibility": x.id_disponibility,
              "heure": x.heure,
            });
          });
          return creneauxDispo;
        });
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API: disponibilité', error);
      }
    },
    async getAddressData(addressInput) {
      try {
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search?q=${addressInput}&type=housenumber&autocomplete=1`);
        this.AllAdresse = response.data.features.map(feature => feature.properties.label);
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API:', error);
      }
    },
    onAddressInputChange(adress) {
      this.getAddressData(adress);
    },

    setup() {
      onMounted(() => {
        this.getAddressData(this.lieuDePriseEnCharge);
      });
    },

    reserver() {
      console.log('Réservation confirmée!');
      // Liaison Mongo pour le formulaire 
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getDisponibility(this.numberOfPersons, this.departureTime.toString(), this.departureDate.toString());

      //console.log(this.AllDisponibility);
      //Récupérer l'horaire lors de la navigation vers la deuxième étape
      // if (pageNumber === 1) {
      //   this.fetchScheduleFromMongo();
      // }
    },
    selectNumberOfPersons(number) {
      this.numberOfPersons = number;
    },
  },
};
</script>

<style scoped>
form {
  display: block;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
}

.progress-dots {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: rgb(245, 66, 101);
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.dot.active {
  background-color: rgb(143, 4, 32);
}

.form-content {
  background: #FFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.step-content {
  margin-bottom: 20px;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 25px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: rgb(245, 66, 101);
  color: #FFF;
  border: none;
  border-radius: 4px;
}

.btn:hover {
  background: rgb(245, 66, 101);
}

.seat-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.seat-button {
  width: 48%;
  margin-bottom: 10px;
}

.seat-buttons button {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.seat-buttons button.selected {
  background: rgb(245, 66, 101);
  color: #FFF;
}
</style>
