<template>
  <nav class="nav-container">
    <div class="logo">
      <img :src="require('@/assets/logo.png')" alt="Logo" class="logo-image" />
    </div>
    <div class="nav-links">
      <a href="#faq" @click.prevent="scrollToFAQ">FAQ</a>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Sign Up</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    scrollToFAQ() {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
header {
  height: 5rem;
  color: white;
}

.nav-container {
  display: flex;
  width: calc(100% - 32px);
  padding: 0 16px;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgb(245, 66, 101);
  position: relative;
}

.logo {
  width: 40px;
  height: 40px;
}

.logo-image {
  height: 100%;
  object-fit: cover;
}

.nav-links {
  margin-left: auto;
}

nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
</style>
