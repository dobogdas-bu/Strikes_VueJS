import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locations from '../views/Locations.vue'
import RegisterAlley from '../views/RegisterAlley.vue'
import Register from '../views/Register.vue'
import HowToPlay from '../views/HowToPlay.vue'
import Login from '../views/auth/Login.vue'
import ViewAllScores from '../views/ViewAllScores.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    
  },
  
  {
    path: '/register-alley',
    name: 'RegisterAlley',
    component: RegisterAlley
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations
  },
  {
    path: '/how-to-play',
    name: 'HowToPlay',
    component: HowToPlay
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ViewAllScores',
    name: 'ViewAllScores',
    component: ViewAllScores
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router