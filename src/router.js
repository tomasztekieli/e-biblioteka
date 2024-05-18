import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: () => import('./views/Borrow.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/faq',
      name: 'Faq',
      component: () => import('./views/Faq.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
  ],
})

