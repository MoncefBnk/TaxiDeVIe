<script>
export default {
  methods: {
    retour() {
      // Use $router.push instead of $route.push
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
