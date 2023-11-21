// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_ZarNd3mV0x7YvUGD91pkoHStMmSwtpo",
  authDomain: "taxi-de-vie.firebaseapp.com",
  projectId: "taxi-de-vie",
  storageBucket: "taxi-de-vie.appspot.com",
  messagingSenderId: "930546003343",
  appId: "1:930546003343:web:246bca5cf64b0db4936ffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }