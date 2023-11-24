<!-- ForgotPassword.vue -->
<template>
  <main class="login">

    <form class="login-form" @submit.prevent="resetPassword">
      <h2>Forgot Password</h2>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" id="email" placeholder="Enter your email" v-model="email" />
      </div>
      <button type="submit" class="reset-password-btn">Reset Password</button>
      <router-link to="/login" class="go-back-link">Go Back to Login</router-link>
    </form>


  </main>
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
          console.log('Password reset email sent successfully');
          // You can add a success message or redirect the user to the login page
        })
        .catch((error) => {
          console.error('Error sending password reset email', error);
          // Handle the error, display a message, etc.
        });
    },
  },
};
</script>
  
<style scoped>
/* Match the styles with the login page */

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
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
  