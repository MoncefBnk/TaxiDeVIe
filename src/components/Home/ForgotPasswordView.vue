<!-- ForgotPassword.vue -->
<template>
  <form class="login-form" @submit.prevent="resetPassword">
    <h3>Mot de passe oublié ?</h3>
    <div class="form-group">
      <p class="help-text">Veuillez saisir l'adresse e-mail avec laquelle vous vous êtes inscrit, si elle correspond, nous
        vous enverrons un lien de récupération</p>
      <input type="email" placeholder="Adresse e-mail" v-model="email" />
    </div>
    <button type="submit" class="reset-password-btn">Réinitialiser le mot de passe</button>
    <router-link to="/login" class="go-back-link">Revenir à la connexion</router-link>
  </form>
</template>
  
<script>

import { auth } from '@/firebase';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    resetPassword() {
      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          console.log('E-mail de réinitialisation du mot de passe envoyé avec succès');
        })
        .catch((error) => {
          console.error('Erreur lors de l envoi du e-mail de réinitialisation du mot de passe', error);
        });
    },
  },
};
</script>
  
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.passowrd-recovery {
  display: flex;
  min-height: 100vh;
}

passowrd-recovery {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}



.login-form {
  padding: 30px;
}

.help-text {
  padding: 1vh;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-password-btn {
  background-color: rgb(245, 66, 101);
  /* Adjust the color as needed */
}

.go-back-link {
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #3498db;
  /* Adjust the color as needed */
  text-decoration: underline;
  cursor: pointer;
}
</style>
  