<template>


  <div class=example>
      <div class=tabs>
       <div id=tab1> <a href="#tab1">Historia wypożyczeń</a>
        <div><p><h3>Historia Wypożyczeń</h3></p>
          <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Autor</th>
            <th scope="col">Tytul</th>
            <th scope="col">Data wypożyczenia</th>
            <th scope="col">Data zwrotu</th>
            <th scope="col">Ulubione</th>
            <th scope="col">Akcje</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in hist" :key="item">
          <td>{{item.id }}</td>
          <td>{{item.autor}}</td>
          <td>{{item.tytul}}</td>
          <td>{{item.datawypoz}}</td>
          <td>{{item.datazwrotu}}</td>
          <td>{{item.ulubione}}</td>
          <td><button @click="i = item">Opis</button></td>
          <td></td>
          
          
            
          </tr>
        </tbody>
      </table>

      <p v-if="i != 0">Szczegóły: ID {{i.id}} <br/>
      Autor: {{i.autor}}<br/>
      Tytuł: {{i.tytul}}<br/>
      Opis: {{i.opis}}<br/>
      Prolongowane: {{i.prolongata}}<br/>
      Data wypożyczenia: {{i.datawypoz}}<br/>
      Data zwrotu: {{i.datazwrotu}}<br/></p>

        </div>
       </div>
  
       <div id=tab2> <a href="#tab2">Ulubione</a>
        <div><p><h3>Moje ulubione</h3></p><br/>

          <li v-for="c, ulu in ulubione2?.filter(c => c.ulubione)":key="c.id">{{ c.autor }}<br/>{{ c.tytul }}<br/><button :disabled="state.inProgress" @click="ulubioneoff(c.id)">usuń</button><br/><br/></li>
          <li v-for="c, ulu in hist?.filter(c => c.ulubione)":key="c.id">{{ c.autor }}<br/>{{ c.tytul }}<br/><button :disabled="state.inProgress" @click="ulubioneoffhist(c.id)">usuń</button><br/><br/></li>
        </div>
       </div>
  
       <div id=tab3> <a href="#tab3">Prolongowane</a>
        <div><p><h3>Książki aktualnie prolongowane</h3></p>
        <li v-for="c, ulu in ulubione2?.filter(c => c.prolongata)":key="c.id">{{ c.autor }}<br/>{{ c.tytul }}<br/><br/></li>

      </div> 
       </div>
  
       <div id=default2> <a href="#default2">Wypożyczone</a>
        <div><div class="container">
          <p><h3>Aktualnie wypożyczone przez: {{ info2 }}</h3></p>
    
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Autor</th>
            <th scope="col">Tytul</th>
            <th scope="col">Opis</th>
            <th scope="col">Data wypożyczenia</th>
            <th scope="col">Ulubione</th>
            <th scope="col">Akcje</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in product" :key="item">
          <td>{{item.id }}</td>
          <td>{{item.autor}}</td>
          <td>{{item.tytul}}</td>
          <td>{{item.opis}}</td>
          <td>{{item.datawypoz}}</td>
          <td>{{item.ulubione}}</td>
          <td><button @click="i = item">Opis</button></td>
          <td><button :disabled="state.inProgress" @click="prolonguj(item.id)">prolonguj</button></td>
          <td><button :disabled="state.inProgress" @click="ulubione(item.id)">dodaj do ulubionych</button></td>
          <td></td> 
          </tr>
        </tbody>
      </table>  
      <p><button @click="product.reverse()">sort</button></p>

      <p v-if="i != 0">Szczegóły: ID {{i.id}} <br/>
      Autor: {{i.autor}}<br/>
      Tytuł: {{i.tytul}}<br/>
      Opis: {{i.opis}}<br/>
      Prolongowane: {{i.prolongata}}<br/>
      Data wyożyczenia: {{i.datawypoz}}<br/><br/><input size="50" v-model="note.name" @input="onInput"><button :disabled="state.inProgress" @click="notatka(i.id)">dodaj notatkę</button></p>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    </template>
    

    <script setup>
    import { getAuth } from "firebase/auth";
    import state from '../../state.js'
    import note from '../../state.js'
    const id = ref(0)
    import { reactive } from 'vue'
    import { ref } from 'vue'
    const course = reactive({ name: '', })
        function onInput(e) {
            course.name = e.target.value
        }
    
    
       
    const product = ref(null); 
    const hist = ref(null)
    const ulubione2 = ref(null);


    
    let info2 = ref('')

    const auth = getAuth();
    const user3 = auth.currentUser;

    if (user3 !== null) {
      user3.providerData.forEach((profile) => {  
      info2.value = profile.email
    });
    }
    
    let api = 'http://192.168.0.103:8000/api/'
    
    // wyświetla wypożyczone
    const errorMessage = ref(null);
    fetch(api + 'wypozyczone/?uzytkownik=' + info2.value )
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
            
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        product.value = data;
    })
    .catch(error => {
        errorMessage.value = error;
        console.error("There was an error!", error);
    });

      
    
    // wyświetla historię wypożyczonych
    fetch(api + 'historia/')
      .then(response => response.json())
      .then(data => hist.value = data);


  function ulubione(id) { 
   // dodaje do ulubionych wybraną pozycję
   
   fetch(api + 'wypozyczone/' + id +'/ulubione/')
       .then(response => response.json())
   
    
    // wyświetla wypożyczone
    fetch(api + 'wypozyczone/?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => product.value = data);
      
    fetch(api + 'wypozyczone?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => ulubione2.value = data);
    
    alert(`Książkę dodano do ulubionych`)    
  }
  // dodaje do prolongowanych
  function prolonguj(id) { 
   fetch(api + 'wypozyczone/' + id +'/prolonguj/')
       .then(response => response.json())
   
    
    // wyświetla wypożyczone
    fetch(api + 'wypozyczone?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => product.value = data);
      
    fetch(api + 'wypozyczone?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => ulubione2.value = data);
    
    alert(`Książka została prolongowana`)    
  }

  function ulubioneoff(id) { 
   // usuwa z ulubionych wybraną pozycję
  
   fetch(api + 'wypozyczone/' + id +'/ulubioneoff/')
       .then(response => response.json())  
    
    // wyświetla wypożyczone
    fetch(api + 'wypozyczone?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => ulubione2.value = data);
    
    alert(`Książkę usunięto z ulubionych`)    
  }


  function ulubioneoffhist(id) { 
   // usuwa z ulubionych wybraną pozycję historia 
  
   fetch(api + 'historia/' + id +'/ulubioneoff/')
       .then(response => response.json())  
    
    // wyświetla wypożyczone
    fetch(api + 'historia/')
      .then(response => response.json())
      .then(data => ulubione2.value = data);
    
    alert(`Książkę usunięto z ulubionych`)    
  }



  function notatka(id){
    state.inProgress = true
    setTimeout(() => {
    // dodaje notatkę 
      state.inProgress = false
    }, 1000)
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    
    },
    body: JSON.stringify({ notatki: 'fdada', })
};
fetch(api +'wypozyczone/' + id, requestOptions)
    .then(response => response.json())
    
  }
  
  //wyświetl wpożyczone
  fetch(api + 'wypozyczone?uzytkownik=' + info2.value)
      .then(response => response.json())
      .then(data => ulubione2.value = data);

      const i = ref(0)      
    
    </script>
    <style scoped>
  div.tabs {
    min-height: 30em;		
    position: relative;		
    line-height: 1;		
    z-index: 0}			
  div.tabs > div {
    display: inline}		
  div.tabs > div > a {
    color: black;			
    background: white;		
    padding: 0.2em;		
    border: 0.1em outset #BBB;	
    border-bottom: 0.1em solid #CCC} 
  div.tabs > div:not(:target) > a {
    border-bottom: none;		
    background:#CCC}		
  div.tabs > div:target > a,	
  :target #default2 > a {		
    border-bottom: 0.1em solid #CCC; 
    background: white}		
  div.tabs > div > div {
    background: white;		
    z-index: -2;		
    left: 0; top: 1.3em;	
    bottom: 0; right: 0;		
    overflow: auto;		
    padding: 0.3em;		
    border: 0.1em outset #BBB}	
  div.tabs > div:not(:target) > div { 
    position: absolute }		
  div.tabs > div:target > div, :target #default2 > div {
    position: absolute;		
    z-index: -1}			
  
  div.tabs :target {
    outline: none}
    
    a:link {
    text-decoration: none;
}
  </style>