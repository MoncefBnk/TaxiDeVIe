<!-- LoadingPage.vue -->

<template>
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>Chargement...</p>
  </div>
</template>
  
<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid rgb(245, 66, 101);
  /* Set the desired color here */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>
  