<template>
  <Header />
  
  <main>
  <router-view/>
  </main>
  <Footer />
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'




export default {
  name: 'App',
  components: {
    Header, Footer }
}
</script>

<style src="./assets/css/styles.css">


</style>
