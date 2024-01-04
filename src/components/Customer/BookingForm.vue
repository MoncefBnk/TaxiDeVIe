<template>
  <div class="form-container">
    <h1>Où allons-nous?</h1>

    <div class="form-content">
      <div v-if="currentPage === 0" class="step-content">
        <h2>Étape 1: Informations sur le lieu</h2>
        <div class="form-group">
          <label>Point de départ</label>
          <input type="text" v-model="lieuDePriseEnCharge" required>
        </div>
        <div class="form-group">
          <label>Point de dépose</label>
          <input type="text" v-model="lieuDeDepose" required>
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
        <h2>Étape 3: Informations sur le compagnon</h2>
        <div class="form-group">
          <label>Nom du compagnon</label>
          <input type="text" v-model="companionName" required>
        </div>
        <div class="form-group">
          <label>Âge du compagnon</label>
          <input type="number" v-model="companionAge" required>
        </div>
      </div>

      <div v-if="currentPage === 3" class="step-content">
        <h2>Étape 4: Informations sur la capacité</h2>
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
    reserver() {
      console.log('Réservation confirmée!');
      // Liaison Mongo pour le formulaire 
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;

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
