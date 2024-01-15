/* eslint-disable */

<template>
  <main class="login">
    <NavbarAdmin />
    <section class="forms">
      <form class="login" @submit.prevent="registerDriver">
        <h2>Ajouter un chauffeur :</h2>
        <input type="text" placeholder="IdDriver" v-model="register_form.id_driver" />
        <input type="text" placeholder="Prénom" v-model="register_form.fullName" />
        <input type="text" placeholder="Nom" v-model="register_form.lastName" />
        <input type="email" placeholder="Adresse e-mail" v-model="register_form.email" />
        <input type="number" placeholder="Identifiant de la voiture assignée" v-model="register_form.id_car" />
        <input type="text" placeholder="Matricule Chauffeur" v-model="register_form.driver_matricule" />
        <input type="text" placeholder="Adresse" v-model="register_form.adress" />
        <input type="tel" placeholder="Numéro de téléphone" v-model="register_form.phoneNumber" />
        <input type="submit" value="Ajouter un chauffeur" />
      </form>
    </section>
  </main>
</template> -->


<script>

import NavbarAdmin from './NavbarAdmin.vue';
import axios from 'axios';

export default {
  data() {
    return {
      register_form: {
        id_driver: '',            // Example property with an empty string as the initial value
        id_car: 0,
        driver_matricule: '',
        fullName: '',
        lastName: '',
        userType: '2',            // Set the default userType to '2'
        email: '',
        phoneNumber: '',
        address: '',              // Added 'address' property as per your request
      },
    };
  },

  components: {
    NavbarAdmin
  },
  methods: {
    async registerDriver() {
      try {
        // Set the userType to '2' by default
        this.register_form.userType = '2';
        const idCarNumber = Number(this.register_form.id_car);
        // Extract only the necessary data for the API call
        const apiData = {
          id_driver: this.register_form.id_driver,
          id_car: idCarNumber,
          driver_matricule: this.register_form.driver_matricule,
          name: this.register_form.fullName,
          lastName: this.register_form.lastName,
          userType: this.register_form.userType,
          mail_address: this.register_form.email,
          phone: this.register_form.phoneNumber,
          adress: this.register_form.adress,
        };

        // Call the registerDriverWithAPI method directly
        await this.registerDriverWithAPI(apiData);

        // Optionally, you can handle success or navigate to another page after successful registration
        console.log('Driver registered successfully!');
      } catch (error) {
        console.error('Error registering driver:', error.message);
        // Handle error (e.g., show an error message to the user)
      }
    },

    async registerDriverWithAPI(apiData) {
      try {
        await axios.post('https://localhost:7066/v1/api/Drivers', apiData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error registering user with API:', error.message);
      }
    },
  },
};
</script>



<style>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 6rem 1rem 1rem;
}

form.register {
  color: #FFF;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(to bottom right,
      rgb(245, 66, 101) 0%,
      rgb(189, 28, 60) 100%);
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.register input:not([type="submit"]) {
  color: #FFF;
  border-bottom: 2px solid #FFF;
}

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #FFF;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

form.register input[type="submit"] {
  background-color: #FFF;
  color: rgb(245, 66, 101);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

.register-links {
  color: #FFF;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 2rem;
  display: block;
}
</style>

<!-- <script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import NavbarAdmin from './NavbarAdmin.vue';
import { getAuth } from 'firebase/auth';

export default {
  setup() {
    const register_form = ref({
      id_driver: '',
      id_car: 0,
      driver_matricule: '',
      name: '',
      lastName: '',
      userType: '',
      mail_address: '',
      phone: '',
    });


    const store = useStore();

    const passwordsDoNotMatch = ref(false);

    // Inside the register function
    const register = async () => {
      if (register_form.value.password === register_form.value.confirmPassword) {
        passwordsDoNotMatch.value = false;

        try {
          var currentAuth = getAuth();
          const user = currentAuth.currentUser;
          var temp = user.uid;
          console.log(temp);

          // Dispatch the register action with the email and password
          await store.dispatch('register', {
            email: register_form.value.email,
            password: register_form.value.password,
          });

          // Dispatch the registerDriverWithAPI action with the user data and temp variable
          await store.dispatch('registerDriverWithAPI', {
            userData: {
              id_driver: user.uid,
              id_car: parseInt(register_form.value.id_car),
              driver_matricule: register_form.value.driver_matricule,
              name: register_form.value.fullName,
              lastname: register_form.value.lastName,
              mail_address: register_form.value.email,
              phone: register_form.value.phoneNumber,
            },
            temp: temp, // Pass the temp variable
          });

        } catch (error) {
          console.error('Error registering user:', error.message);
        }
      } else {
        passwordsDoNotMatch.value = true;
      }
    };


    return {
      register_form,
      register,
      passwordsDoNotMatch,
    };
  },
  components: {
    NavbarAdmin,
  },
};
</script> 
   -->