<template>

{{ info }}  
<h3>Nasze zasoby</h3>Wyszukaj:<br/><br/>
  <button :disabled="state.inProgress" @click="moja">szukaj</button>
  
  <input size="50" placeholder="wpisz autora tytuł lub opis" v-model="state.name" @input="onInput"><br/><br/>

  Wyniki

  <div class="container">
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Autor</th>
          <th scope="col">tytul</th>
          <th scope="col">opis</th>
          <th scope="col">stan</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in product" :key="item">
          <td>{{item.id }}</td>
          <td>{{item.autor}}</td>
          <td>{{item.tytul}}</td>
          <td>{{item.opis}}</td>
          <td>{{item.stan}}</td>
          <td><button @click="i = item">Opis</button></td>
          <td><button @click="zamowienie(item.id, email, item.autor, item.tytul, item.opis)">Zamów</button></td>
          <td></td>
          
          
          
            
        </tr>
      </tbody>
    </table>
    
    
    <p v-if="i != 0">Szczegóły: ID {{i.id}} <br/>
      Autor: {{i.autor}}<br/>
      Tytuł: {{i.tytul}}<br/>
      Opis: {{i.opis}}<br/>
      Stan: {{i.stan}}<br/>
    </p>

       <p><button @click="product.reverse()">Odwróć</button></p>
       
  </div>

  <ul>
  <li v-for="ala in product":key="ala">{{ ala.autor }}<br/>{{ ala.tytul }}<br/><br/></li>
  </ul>


</template>

<script setup>
  
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import state from '../../state.js'
  import { getAuth } from "firebase/auth";
  const email = ref('')
  let info = ref('')

const auth = getAuth();
const user2 = auth.currentUser;

if (user2 !== null) {
  user2.providerData.forEach((profile) => {  
  email.value = profile.email
  info.value = "jesteś zalogowany jako: " + profile.email
  });
}


  
const product = ref(null); 
let api = 'http://192.168.0.103:8000/api/'

function moja() { 
    state.inProgress = true
    setTimeout(() => {
      state.inProgress = false
    }, 1000)

// szukanie
const errorMessage = ref(null);
fetch(api + 'ksiazki/?search=' + state.name)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        product.value = data;
    })
    .catch(error => {
        errorMessage.value = error;
        console.error("There was an error!", error);
    });

}
function zamowienie(id, email, autor, tytul, opis) { 
   
    
// aktualizuje stan (stan-1)    

fetch(api + 'ksiazki/' + id +'/nowystan/')
    .then(response => response.json())
    .then(data => product.value = data);
   

// zapisanie do bazy wypozyczonych
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uzytkownik: email,
      autor: autor, 
      tytul: tytul,
      opis: opis,
      
      })
};
fetch(api + 'wypozyczone/', requestOptions)
    .then(response => response.json())


    

// aktualizuje listę
fetch(api + 'ksiazki/?search=' + state.name)
    .then(response => response.json())
    .then(data => product.value = data);

  
    
  alert(`książka została zamówiona`)
  }

  const i = ref(0)   
  


</script>
