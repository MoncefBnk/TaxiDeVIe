/* eslint-disable */
<template>
	<main class="login">
		<section class="forms">
			<form class="register" @submit.prevent="register">
				<h2>Welcome to Taxi de vie</h2>
				<h2>Register</h2>
				<input type="text" placeholder="Full Name" v-model="register_form.fullName" />
				<input type="text" placeholder="Last Name" v-model="register_form.lastName" />
				<input type="email" placeholder="Email address" v-model="register_form.email" />
				<input type="password" placeholder="Password" v-model="register_form.password" />
				<input type="password" placeholder="Confirm Password" v-model="register_form.confirmPassword" />
				<input type="text" placeholder="Address" v-model="register_form.address" />
				<input type="tel" placeholder="Phone Number" v-model="register_form.phoneNumber" />
				<!-- Add any other required fields here -->
				<input type="submit" value="Register" />
				<p>Already have an account ?</p>
				<router-link to="login" class="register-links">Login here !</router-link>
				<p v-if="passwordsDoNotMatch">Passwords do not match!</p>
			</form>
		</section>
	</main>
</template>
  
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Rajouter la confirmation de mail
export default {
	setup() {
		const register_form = ref({
			numberClient: '',
			name: '',
			lastName: '',
			mail_address: '',
			adress: '',
			phone: '',
		});
		const store = useStore();
		const passwordsDoNotMatch = ref(false);
		const register = async () => {
			if (register_form.value.password === register_form.value.confirmPassword) {
				passwordsDoNotMatch.value = false;
				try {
					store.dispatch('register', register_form.value);
					const auth = getAuth();
					const unsubscribe = onAuthStateChanged(auth, async (user) => {
						if (user) {
							const userUid = user.uid;
							const userData = {
								numberClient: userUid,
								name: register_form.value.fullName,
								lastname: register_form.value.lastName,
								mail_address: register_form.value.email,
								adress: register_form.value.address,
								phone: register_form.value.phoneNumber,
							};
							await store.dispatch('registerUserWithAPI', userData);
							unsubscribe();
						}
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