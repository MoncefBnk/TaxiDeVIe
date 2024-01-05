<template>
  <div class="faq">
    <div class="global-label">
      <div class="global-label-text">Questions Fréquemment Posées</div>
    </div>

    <!-- Q1 -->
    <div class="faq-container" @click="toggleAnswer(1)" :class="{ 'active': showAnswer[1] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Où puis-je trouver Taxis de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[1] }">
          <span class="material-icons">{{ showAnswer[1] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[1]">
        <li>Les Taxis de Vie sont stationnés les nuits du vendredi et du samedi aux endroits suivants :
          <ul>
            <li>Jardin public (Cassourat, en face du Byron)</li>
            <li>Place de la course (en face de la poste)</li>
            <li>Place Saint Pierre</li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- Q2 -->
    <div class="faq-container" @click="toggleAnswer(2)" :class="{ 'active': showAnswer[2] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Quand le service est-il disponible ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[2] }">
          <span class="material-icons">{{ showAnswer[2] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[2]">
        <li>Le service fonctionne tous les week-ends, les vendredis et samedis soirs, de 1h00 à 6h00.</li>
      </ul>
    </div>

    <!-- Q3 -->
    <div class="faq-container" @click="toggleAnswer(3)" :class="{ 'active': showAnswer[3] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Combien coûte la course pendant les heures de service "Taxis de Vie" ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[3] }">
          <span class="material-icons">{{ showAnswer[3] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[3]">
        <li>Vous bénéficierez d'une réduction par rapport au tarif normal pendant les heures de service "Taxis de Vie".</li>
      </ul>
    </div>

    <!-- Q4 -->
    <div class="faq-container" @click="toggleAnswer(4)" :class="{ 'active': showAnswer[4] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Qui peut utiliser Taxis de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[4] }">
          <span class="material-icons">{{ showAnswer[4] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[4]">
        <li>Chaque véhicule Taxis de Vie peut accueillir six passagers. Le principe est que tous les sièges doivent être occupés.</li>
      </ul>
    </div>

    <!-- Q5 -->
    <div class="faq-container" @click="toggleAnswer(5)" :class="{ 'active': showAnswer[5] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Comment puis-je reconnaître les véhicules Taxis de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[5] }">
          <span class="material-icons">{{ showAnswer[5] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[5]">
        <li>Les véhicules Taxis de Vie sont reconnaissables par un autocollant Taxis de Vie sur le pare-brise.</li>
      </ul>
    </div>

    <!-- Q6 -->
    <div class="faq-container" @click="toggleAnswer(6)" :class="{ 'active': showAnswer[6] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Puis-je réserver un Taxi de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[6] }">
          <span class="material-icons">{{ showAnswer[6] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[6]">
        <li>Vous pouvez réserver par téléphone à partir de 18h00 le Vendredi, également par SMS ou utilisez le formulaire en ligne.</li>
      </ul>
    </div>

    <!-- Q7 -->
    <div class="faq-container" @click="toggleAnswer(7)" :class="{ 'active': showAnswer[7] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Comment payer mon Taxi de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[7] }">
          <span class="material-icons">{{ showAnswer[7] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[7]">
        <li>Vous réglez votre course directement au chauffeur Taxis de Vie.</li>
      </ul>
    </div>

    <!-- Q8 -->
    <div class="faq-container" @click="toggleAnswer(8)" :class="{ 'active': showAnswer[8] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Quelles sont les limites des courses des Taxis de Vie ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[8] }">
          <span class="material-icons">{{ showAnswer[8] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[8]">
        <li>30 Km maxi autour de Dax.</li>
      </ul>
    </div>

    <!-- Q9 -->
    <div class="faq-container" @click="toggleAnswer(9)" :class="{ 'active': showAnswer[9] }">
      <div class="faq-label">
        <div class="faq-label-text">Q : Puis-je trouver un Taxi de Vie dans une autre ville ?</div>
        <div class="faq-label-icon" :class="{ 'rotate': showAnswer[9] }">
          <span class="material-icons">{{ showAnswer[9] ? '-' : '+' }}</span>
        </div>
      </div>
      <ul class="answer" v-show="showAnswer[9]">
        <li>Pour l'instant, Taxis de Vie n'existe qu'à DAX.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAnswer: {},
    };
  },
  methods: {
    toggleAnswer(questionNumber) {
      this.showAnswer[questionNumber] = !this.showAnswer[questionNumber];
    },
  },
};
</script>

<style scoped>
/* Add styles if needed */
ul ul {
  list-style-type: none;
  margin-left: 20px;
  display: none; /* Hide initially */
}

.answer {
  padding-left: 0; /* Removed dot before the answer */
}

.faq {
  padding: 20px;
  width: 80%;
  max-width: 800px;
  margin: auto;
  position: relative;
  height: auto;
}

.faq-container {
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
}

.faq-label {
  cursor: pointer;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 19px;
  background: rgb(245, 112, 139);
  box-shadow: 5px 5px 10px #b7d1d3, -5px -5px 10px #e9ffff;
}

.faq-label-text {
  color: #365a5e;
}

.faq-label-icon {
  padding: 2px 3px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 10%; /* Adjust the percentage as needed */
}

.material-icons {
  color: #365a5e;
  transition: 0.3s ease;
}

.active {
  height: auto;
}

.rotate {
  transform: rotate(180deg);
}

.global-label {
  color: #365a5e;
  width: 100%;
  height: 35px;
  border-bottom: solid 2px #c4c1c1;
  margin-bottom: 35px;
}

.global-label-text {
  font-size: 18px;
  font-weight: 700;
  color: #365a5e;
}

@media screen and (max-width: 600px) {
  .faq {
    width: 90%;
  }

  .faq-label {
    flex-wrap: nowrap;
    justify-content: center; /* Center the dropdown */
  }

  .faq-label-text {
    flex: 0 0 100%;
  }

  .faq-label-icon {
    flex: 0 0 100%;
    margin-top: 10px; /* Add margin to separate the question and dropdown on mobile */
  }
}
</style>
