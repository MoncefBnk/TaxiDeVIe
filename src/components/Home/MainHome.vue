<template>
  <div>
    <main class="grid-container">
      <div class="content-container">
        <div class="image-container">
          <img src="@/assets/car-driving.gif" alt="Animated Gif" />
        </div>
        <div class="slogan-container">
          <div class="slogan">
            <h1>TECHTRANSIT</h1>
            <p>Votre Trajet Connecté, Prix Fixe, Service Imbattable.</p>
            <router-link to="/booking" class="book-ride">Book a ride</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grid-container {
  padding: 25px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh; 
}

.content-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center; 
  justify-content: center; 
}

.slogan-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  text-align: center;
}

.slogan {
  text-align: center;
}

.book-ride {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 12px;
  height: 100%;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

@media (min-width: 768px) {
  .content-container {
    flex-direction: row;
  }

  .image-container {
    margin-right: 20px;
  }
}
</style>