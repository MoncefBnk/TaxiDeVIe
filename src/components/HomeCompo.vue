<template>
  <div>
    <header>
      <nav class="nav-container">
        <div class="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div class="nav-links">
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Sign Up</router-link>
        </div>
      </nav>
    </header>

    <main class="grid-container">
      <div class="image-container">
        <img src="@/assets/car-driving.gif" alt="Animated Gif" />
      </div>
      <div class="slogan-container">
        <div class="slogan">
          <h1>TECHTRANSIT</h1>
          <p>Votre Trajet Connecté, Prix Fixe, Service Imbattable.</p>
          <button class="book-ride">Book a Ride</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grid-container {
  padding: 25px;
}

header {
  height: 5rem;
  color: white;
}

.nav-container {
  display: flex;
  width: calc(100% - 32px);
  padding: 0 16px;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  background: rgb(245, 66, 101);
  position: relative;
}

.logo img {
  height: 50px;
}

.nav-links {
  margin-left: auto; 
}

nav a {
  color: white; 
  margin: 0 10px;
  text-decoration: none;
}

.slogan-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
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
</style>