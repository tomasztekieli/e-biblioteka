<template>
  <div class="wrapper">
    <page-header></page-header>
    <page-nav>
    </page-nav>
    <page-main>
      <router-view></router-view>
    </page-main>
    <page-footer></page-footer>
  </div>

</template>

<script setup>
  import { onBeforeMount } from 'vue';
  import PageHeader from './components/PageHeader.vue';
  import PageFooter from './components/PageFooter.vue';
  import PageMain from './components/PageMain.vue';
  import PageNav from './components/PageNav.vue';
  import { useRouter, useRoute } from 'vue-router';
  
 
  

  const router = useRouter();
  const route = useRoute();

  
</script>

<style>
th, td {
  border-bottom: 1px solid #ddd;
  
}
table {
  width: 70%;
}
  body { 
      margin: 0; 
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  }
  .wrapper { 
    display: grid;
    grid-template-rows: min-content min-content 1fr min-content;
    height: calc(100vh - 5rem);
    max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1px;
  padding-right: 1px;
  }
  header {
    max-height: 300px ;
     padding: 8rem;
     background-image: url(./assets/baner-ebiblioteka.jpg);
     color: white
  }
  nav a+a {
    margin-left: 1rem
  }
  nav {
     background-color: white;
     padding: 1rem;
  }
  main { 
    background-color: white;
    padding: 1rem;
  }
  footer {
    background-color: #ccc;
    padding: 1rem;
    text-align: center;
  }
  a:hover {
  color: hotpink;
}
</style>


  
