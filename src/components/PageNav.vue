<template>
    <nav><slot>
    <div> <router-link :to="{ name: 'Home' }" exact><span class="lewa">Strona główna</span></router-link>
  <router-link :to="{ name: 'Borrow' }" v-if="isLoggedIn">Moje wypożyczenia</router-link>
  <router-link :to="{ name: 'Faq' }">FAQ</router-link>
  
  <router-link :to="{ name: 'Login' }"><span class="prawa" v-if="!isLoggedIn">Login</span></router-link>
    <span class="prawa"> <button @click="handleSignOut" v-if="isLoggedIn">Wyloguj </button></span> 
</div></slot></nav>
  </template>


<script setup>

import { onMounted, ref } from "vue"
const isLoggedIn = ref(false)
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter} from 'vue-router'
const router = useRouter()


let auth;
onMounted(() => {
auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }

  });
});



const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/faq")
  });
  
};



</script>

<style scoped>

.lewa {float:left; display:inline}
.prawa {float:right;display:inline}
.router-link-active {
	color: blue;
	font-weight: bold;
    
}
a:link {
    text-decoration: none;
}

a:hover {
    color: hotpink;
  }



  a:active {
  color: blue;
  text-decoration: underline;
  }
</style>