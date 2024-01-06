<template>
    <NavbarDriver />
    <div>
      <!-- Simuler une nouvelle demande de trajet -->
      <button @click="simulateNewRideRequest">Simuler une nouvelle demande de trajet</button>
      
      <div v-if="showValidation" class="validation-overlay">
        <div class="validation-info">
          <h2>Nouvelle demande de trajet</h2>
          <p>{{ customerName }} demande un trajet.</p>
          <p>Emplacement : {{ pickupLocation }}</p>
          <button @click="acceptRide">Accepter</button>
          <button @click="rejectRide">Rejeter</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import NavbarDriver from '@/components/Driver/NavbarDriver.vue';

  export default {
    components: {
    NavbarDriver,

  },
    data() {
      return {
        showValidation: false,
        customerName: "",
        pickupLocation: "",
        requestId: null,
      };
    },
    methods: {
      // Simuler l'appel API à des fins de démonstration
      simulateAPICall(action) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.5) {
              resolve(`Trajet ${action}é avec succès`);
            } else {
              reject(`Erreur lors de ${action} du trajet`);
            }
          }, 1000); // Simulation d'un délai comme s'il s'agissait d'un appel API asynchrone
        });
      },
      simulateNewRideRequest() {
        // Simuler une nouvelle demande de trajet
        const customerName = "John Doe";
        const pickupLocation = "123 Main Street";
        const requestId = Math.floor(Math.random() * 1); // Simulation d'un ID unique
  
        // Afficher les informations de validation
        this.showValidationPopup(customerName, pickupLocation, requestId);
      },
      showValidationPopup(customerName, pickupLocation, requestId) {
        this.customerName = customerName;
        this.pickupLocation = pickupLocation;
        this.requestId = requestId;
        this.showValidation = true;
      },
      acceptRide() {
        // Simuler l'appel API pour accepter le trajet
        this.simulateAPICall("accepter")
          .then((response) => {
            console.log(response);
            // Placeholder: Fermer les informations de validation après une acceptation réussie
            this.showValidation = false;
          })
          .catch((error) => {
            console.error(error);
            // Gérer l'erreur si nécessaire
          });
      },
      rejectRide() {
        // Simuler l'appel API pour rejeter le trajet
        this.simulateAPICall("rejeter")
          .then((response) => {
            console.log(response);
            // Placeholder: Fermer les informations de validation après un rejet réussi
            this.showValidation = false;
          })
          .catch((error) => {
            console.error(error);
            // Gérer l'erreur si nécessaire
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .validation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .validation-info {
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  button {
    margin: 5px;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  