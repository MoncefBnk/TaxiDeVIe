<template>
	<main class="profile">
		<NavbarDriver />
		<section class="forms">
			<form class="profile">
				<h2>Profil</h2>

				<input type="text" placeholder="Prénom" v-model="clientInfo.name" />
				<input type="text" placeholder="Nom" v-model="clientInfo.lastname" />
				<input type="email" placeholder="Adresse e-mail" v-model="clientInfo.mail_address" />
				<input type="tel" placeholder="Numéro de téléphone" v-model="clientInfo.phone" />
				<input type="submit" value="Engregistrer" />
			</form>
		</section>
	</main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavbarDriver from '@/components/Driver/NavbarDriver.vue';

export default {
	components: {
		NavbarDriver,

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
.forms {
	display: flex;
	min-height: 100vh;
}

form {
	flex: 1 1 0%;
	padding: 1rem 1rem 1rem;
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