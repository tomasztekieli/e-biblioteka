<template>
    <h1>Zarejestruj się</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter} from 'vue-router'
const email = ref("");
const password = ref("");
const router = useRouter()

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value )
  .then((data) => {
    console.log("successfully registered");
    router.push('/')
  })
  .catch((error) => {
    console.log(error.code);
    router.push('/feed')
    alert(error.message);
  })
};

const signInWithGoogle = () => {

};
</script>