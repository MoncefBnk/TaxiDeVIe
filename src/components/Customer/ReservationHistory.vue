<template>
    <div>
        <h1>Historique</h1>
        <div v-if="filteredReservations.length === 0" class="no-reservations">Aucune historique trouvée.</div>
        <div v-else>
            <ReservationItem v-for="reservation in filteredReservations" :key="reservation._id"
                :reservation="reservation" />
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import ReservationItem from '@/components/Shared/ReservationItem.vue';
import { auth } from '@/firebase';

export default {
    data() {
        return {
            reservations: [],
            filteredReservations: [],
        };
    },
    mounted() {
        this.fetchReservations();
    },
    methods: {
        async fetchReservations() {
            try {
                const user = auth.currentUser;

                if (user) {
                    const userId = user.uid;
                    let apiEndpoint;
                    setInterval(async () => {
                        try {
                            if (this.$store.getters.userType === '1') {
                                // Customer
                                apiEndpoint = `https://localhost:7066/v1/api/Client/display/reservations/${userId}`;
                            } else if (this.$store.getters.userType === '2') {
                                // Driver
                                apiEndpoint = `https://localhost:7066/v1/api/Drivers/AllReservationsDriver/${userId}`;
                            } else if (this.$store.getters.userType === '3') {
                                // Admin
                                apiEndpoint = `https://localhost:7066/v1/api/Reservations`
                            }

                            const response = await axios.get(apiEndpoint);
                            this.reservations = response.data;

                            // Filter reservations based on reservations_status
                            this.filteredReservations = this.reservations.filter(reservation => reservation.reservations_status === 3);
                        } catch (error) {
                            console.error('Error fetching reservations:', error);
                        }
                    }, 3000);

                    // Check user type
                    if (this.$store.getters.userType === '1') {
                        // Customer
                        apiEndpoint = `https://localhost:7066/v1/api/Client/display/reservations/${userId}`;
                    } else if (this.$store.getters.userType === '2') {
                        // Driver
                        apiEndpoint = `https://localhost:7066/v1/api/Drivers/AllReservationsDriver/${userId}`;
                    } else if (this.$store.getters.userType === '3') {
                        // Admin
                        apiEndpoint = `https://localhost:7066/v1/api/Reservations`
                    }

                    const response = await axios.get(apiEndpoint);
                    this.reservations = response.data;

                    // Filter reservations based on reservations_status
                    this.filteredReservations = this.reservations.filter(reservation => reservation.reservations_status === 3);
                } else {
                    console.warn('No user is currently signed in.');
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        }
    },
    components: {
        ReservationItem,
    },
};
</script>
  
<style scoped>
h1 {
    color: #333;
    text-align: center;
}

.no-reservations {
    margin: 20px 0;
    color: #888;
    text-align: center;
}

/* Add more styles as needed */
</style>