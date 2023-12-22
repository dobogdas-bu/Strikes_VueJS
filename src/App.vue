<template>

  <Header v-if="!sessionStore.showLanding"/>

  <main :class="mainLanding">
  <router-view />
  </main>
  <Footer v-if="!sessionStore.showLanding"/>

</template>

<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useSessionStore } from './stores/SessionStore';
import { ref } from 'vue';
import { watchEffect } from 'vue';

const mainLanding = ref('')
const sessionStore = useSessionStore()





  // if(sessionStore.showLanding ===true){
  //  mainLanding.value = 'main-landing' 
  // } else {
  //   mainLanding.value = ''
  // }
  watchEffect(() => {
    
      mainLanding.value = sessionStore.showLanding
      
      if(mainLanding.value === true){
        mainLanding.value = 'main-landing'
        
      }
    
   
});




</script>

<style src="./assets/css/styles.css">


</style>
