<template>
    <NavbarAdmin />
    <h1>La liste des chauffeurs</h1>
      <div class="reservation-item" v-for="driver in ListeAllDriver" :key="driver.name">
        <div class="info-container">
          <p class="info"><strong>Nom:</strong> {{ driver.name }}</p>
          <p class="info"><strong>Penom:</strong> {{ driver.lastname }}</p>
          <p class="info"><strong>Mail:</strong> {{ driver.mail }}</p>
          <p class="info"><strong>Numero:</strong> {{ driver.phone }}</p>
          <p class="info"><strong>Plaque immatriculation:</strong> {{ driver.driver_matricule }}</p>
        </div>
      </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import NavbarAdmin from '@/components/Admin/NavbarAdmin.vue';
import axios from 'axios';

export default {
  components: {
    NavbarAdmin,
  },
  setup() {
    const ListeAllDriver = ref([]);
    const getAllDriver = async () => {
      try {
        const reponseApi = await axios.get('https://localhost:7066/v1/api/Drivers');
        ListeAllDriver.value = reponseApi.data.map(x => ({
          "name": x.name,
          "lastname": x.lastname,
          "mail": x.mail_address,
          "phone":x.phone,
          "driver_matricule":x.driver_matricule
        }))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    onMounted(() => {
      getAllDriver();
    });
    return {
      ListeAllDriver
    };
  },
};
</script>

<style scoped>
.reservation-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.info {
  margin: 8px 0;
  text-align: left;
  font-size: 14px;
  /* Adjust the font size as needed */
}
</style>
