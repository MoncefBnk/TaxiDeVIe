<template>
	<main class="profile">
		<NavbarCustomer />
		<section class="forms">
			<form @submit.prevent="modifyMyAccount" class="profile">
				<h2>Profile</h2>
				<input type="text" placeholder="Prénom" v-model="clientInfo.name" />
				<input type="text" placeholder="Nom" v-model="clientInfo.lastname" />
				<input type="email" placeholder="Adresse e-mail" v-model="clientInfo.mail_address" />
				<input type="tel" placeholder="Numéro de téléphone" v-model="clientInfo.phone" />
				<input type="submit" value="modifier" />
				<div v-if="profileUpdated" class="success-message">
					Le profil a été mis à jour avec succès!
				</div>
			</form>
		</section>
	</main>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavbarCustomer from '@/components/Customer/NavbarCustomer.vue';
import axios from 'axios';
import { auth } from '@/firebase';
export default {
	data() {
		return {
			profileUpdated: false,
		};
	},
	components: {
		NavbarCustomer,
	},
	methods: {
		async modifyMyAccount() {
			//Calling API to uspdate driver ....
			const user = auth.currentUser;
			const numberClient = user.reloadUserInfo.localId;
			const updateData = {
				id: this.clientInfo.id,
				numberClient: numberClient,
				name: this.clientInfo.name,
				lastname: this.clientInfo.lastname,
				mail_address: this.clientInfo.mail_address,
				userType: this.clientInfo.userType,
				adress: this.clientInfo.adress,
				phone: this.clientInfo.phone,
			};
			const update = await axios.put(`https://localhost:7066/v1/api/Client/${this.clientInfo.id}`, updateData);
			update.data.jsoon;
			this.clientInfo = updateData;
			this.profileUpdated = true;
			console.log(this.clientInfo);
			 setTimeout(() => {
          this.profileUpdated = false;
        }, 3000);
		},
	},
	setup() {
		const store = useStore();
		const clientInfo = ref(store.state.clientInfo);

		onMounted(() => {
			const numberClient = store.state.numberClient;
			store.dispatch('fetchClientInfo', numberClient);
		});

		return {
			clientInfo,
		};
	},
};
</script>


  
<style>
.success-message {
	color: green;
	margin-top: 10px;
}

.forms {
	display: flex;
	min-height: 100vh;
}

form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
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


form.profile input:not([type="submit"]) {
	color: #2c3e50;
	border-bottom: 2px solid #2c3e50;
}

form.profile input[type="submit"] {
	background-color: rgb(245, 66, 101);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

.links {
	color: #3498db;
	text-decoration: underline;
	cursor: pointer;
	margin-bottom: 2rem;
	display: block;
}
</style>