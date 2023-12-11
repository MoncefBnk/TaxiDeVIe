<!-- ForgotPassword.vue -->
<template>
  
    <form class="login-form" @submit.prevent="resetPassword">
      <h2>Forgot Password</h2>
      <div class="form-group">
        <p class="help-text">Please enter your email adress that you have registered with, if it matches we will send you a recovery link</p>
        <input type="email" placeholder="Email address" v-model="email" />
      </div>
      <button type="submit" class="reset-password-btn">Reset Password</button>
      <router-link to="/login" class="go-back-link">Go Back to Login</router-link>
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



.form-group {
  margin-bottom: 20px;
}
.help-text{
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
  