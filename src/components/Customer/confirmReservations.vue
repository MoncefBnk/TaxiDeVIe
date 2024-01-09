<script>
export default {
  methods: {
    retour() {
      this.$router.push('customer');
    }
  }
};
</script>

<template>
  <div>
    <p>Votre réservation a été validée</p>
    <button @click="retour">Retour</button>
  </div>
</template>
