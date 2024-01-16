/* eslint-disable */

<template>
  <div>
    <NavbarAdmin />
    <div class="form-container">
      <h1>Ajouter un chauffeur</h1>
      <div class="form-content">
        <div v-if="currentPage === 0" class="step-content">
          <h2>Étape 1 </h2>
          <div class="form-group">
            <label>IdDriver</label>
            <input type="text" v-model="register_form.id_driver" required>
          </div>
          <div class="form-group">
            <label>Adresse e-mail</label>
            <input type="email" v-model="register_form.email" required>
          </div>
        </div>

        <div v-if="currentPage === 1" class="step-content">
          <h2>Étape 2</h2>
          <div class="form-group">
            <label>Prénom</label>
            <input type="text" v-model="register_form.fullName" required>
          </div>
          <div class="form-group">
            <label>Nom</label>
            <input type="text" v-model="register_form.lastName" required>
          </div>
          <div class="form-group">
            <label>Identifiant de la voiture assignée</label>
            <input type="number" v-model="register_form.id_car" required>
          </div>
          <div class="form-group">
            <label>Matricule Chauffeur</label>
            <input type="text" v-model="register_form.driver_matricule" required>
          </div>
          <div class="form-group">
            <label>Adresse</label>
            <input type="text" v-model="register_form.address" required>
          </div>
          <div class="form-group">
            <label>Numéro de téléphone</label>
            <input type="tel" v-model="register_form.phoneNumber" required>
          </div>
        </div>

        <div class="btn-group">
          <button v-if="currentPage > 0" @click="goToPage(currentPage - 1)" class="btn">Précédent</button>
          <button v-if="currentPage < steps.length - 1" @click="goToPage(currentPage + 1)" class="btn">Suivant</button>
          <button v-if="currentPage === steps.length - 1" @click="registerDriver" class="btn">Ajouter le chauffeur</button>
        </div>
      </div>

      <div class="progress-dots">
        <div v-for="(step, index) in steps" :key="index" class="dot" :class="{ 'active': index === currentPage }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from './NavbarAdmin.vue';
import axios from 'axios';

export default {
  data() {
    return {
      register_form: {
        id_driver: '',
        id_car: 0,
        driver_matricule: '',
        fullName: '',
        lastName: '',
        userType: '2',
        email: '',
        phoneNumber: '',
        address: '',
      },
      steps: [
        { title: 'Etape 1' },
        { title: 'Etape 2' },
      ],
      currentPage: 0,
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
          id_driver: this.register_form.id_driver, //sur la premiere page du formulaire ok
          id_car: idCarNumber,
          driver_matricule: this.register_form.driver_matricule,
          name: this.register_form.fullName,
          lastName: this.register_form.lastName,
          userType: this.register_form.userType,
          mail_address: this.register_form.email, //sur la premiere page du formulaire ok
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

    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>



<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
}

.progress-dots {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: rgb(245, 66, 101);
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.dot.active {
  background-color: rgb(143, 4, 32);
}

.form-content {
  background: #FFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.step-content {
  margin-bottom: 20px;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 25px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: rgb(245, 66, 101);
  color: #FFF;
  border: none;
  border-radius: 4px;
}

.btn:hover {
  background: rgb(245, 66, 101);
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