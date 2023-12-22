import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locations from '../views/Locations.vue'
import RegisterAlley from '../views/RegisterAlley.vue'
import Register from '../views/Register.vue'
import HowToPlay from '../views/HowToPlay.vue'
import ViewAllScores from '../views/ViewAllScores.vue'
import Games from '../views/Games'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import UserDetails from '../views/UserDetails.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import { useUserStore } from '@/stores/UserStore';


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
    meta: {
      noAuth: true
    }
  },
  
  {
    path: '/register-alley',
    name: 'RegisterAlley',
    component: RegisterAlley,
    meta: {
      requiresAuth: true
    }
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
    path: '/view-all-scores',
    name: 'ViewAllScores',
    component: ViewAllScores
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetails,
    props: true
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth : true
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next)=>{
  const userStore = useUserStore()
  if(to.meta.requiresAuth){
    if(!userStore.stateToken){
      return next('/')
    }
  }
  if(to.meta.noAuth){
    if(userStore.stateToken){
      return next('/')
    }
  }
  next()
})
export default router