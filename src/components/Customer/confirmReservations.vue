<template>
  <div class="reservation-confirmation">
    <h1>🎉</h1>
    <h2>félicitation</h2>
    <p>Votre réservation a été validée.</p>
    <p>Vous recevrez bientôt un mail avec les informations de votre réservation.</p>
    <button @click="retour" class="return-btn">Retour</button>
  </div>
</template>

<script>
export default {
  methods: {
    retour() {
      this.$router.push('customer');
    }
  }
};
</script>

<style scoped>
.reservation-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
}

h1 {
  font-size: 50px;
  margin-bottom: 5px;
}

p {
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.return-btn {
  background-color: rgb(245, 66, 101);
  color: #fff;
  padding: 10px;
  width: 150px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
