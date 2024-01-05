<template>
    <div class="profile-form">
      <h2>Profil</h2>
      <form @submit.prevent="submitProfile">

        <div class="form-group">
          <label for="name">Nom</label>
          <input type="text" id="name" v-model="lastname" required>
        </div>
  

        <div class="form-group">
          <label for="name">Prénom</label>
          <input type="text" id="name" v-model="name" required>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="phone">Numéro de téléphone</label>
          <input type="tel" id="phone" v-model="phone" required>
        </div>
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',

      };
    },
    methods: {
      submitProfile() {
        const profileData = {
          lastname: this.lastname,
          name: this.name,
          email: this.email,
          phone: this.phone,
        };
  
        console.log('Profile submitted:', profileData);
  
      },
    },
  };
  </script>
  
  <style scoped>

  </style>