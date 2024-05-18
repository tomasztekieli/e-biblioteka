<template>
    <h1>Zaloguj</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><input type="password" placeholder="Hasło" v-model="password" /></p>
    <p><button @click="register">Zaloguj</button></p>
</template>

<script setup>

import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter} from 'vue-router'
const email = ref("");
const password = ref("");
const errMsg = ref() // error message
const router = useRouter()

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value )
  .then((data) => {
    console.log("successfully signed in");
    console.log(auth.currentUser)
    router.push({path:'/'})
  })
  .catch((error) => {
    console.log(error.code);
    switch(error.code) {
      case "auth/invalid-email":
        errMsg.value = "nieporawny e-mail"
        break;
      case "auth/user-not-found":
        errMsg.value = "użytkownik nie znaleziony";
        break;
      case "auth/wrong-password":
        errMsg.value = "niepoprawne hasło";
        break;
      default:
        errMsg.value = "niepoprawne hasło lub e-mail";
        break;
    }
    router.push({path:'/faq'})
    alert(error.message);
  })
};

const signInWithGoogle = () => {

};
</script>