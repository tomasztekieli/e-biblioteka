import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'


import { initializeApp } from "firebase/app";



// Your web app's Firebase configuration
const firebaseConfig = {
  //usunięte!!!
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
