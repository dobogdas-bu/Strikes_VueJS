<template>

  <Header  v-if="!sessionStore.showLanding"/>
    <Banner  style="border-radius:2px;margin: 0px; opacity: 1;" v-if="submitted && !userStore.stateToken" @closeBanner="() => {
        submitted = false
    }">
        <p style="margin-left: 10px;">Login to start new game.</p>
    </Banner>
  <main :class="mainLanding">

  <router-view />

  </main>
  <Footer v-if="!sessionStore.showLanding"/>

</template>

<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Banner from './components/Banner.vue';
import { useSessionStore } from './stores/SessionStore';
import { ref, onMounted } from 'vue';
import { watchEffect } from 'vue';
import { useUserStore } from './stores/UserStore';
const mainLanding = ref('')
const sessionStore = useSessionStore()
const userStore = useUserStore()
const submitted = ref(null)
onMounted(() => {
    if (!userStore.stateToken) {
        submitted.value = true
    }
});


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
