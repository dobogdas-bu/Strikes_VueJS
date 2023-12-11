<template>

    <div v-if="!error" class="banner">      
        <p>Submission Received</p>     
        <div class="exit-button-container" @click="closeBanner">
                <div class="exit-button"></div>
        </div>
    </div>
    <div v-else class="error-banner">
        <p>There was an error processing your request. Error condition is {{ error }}</p>
        <div class="exit-button-container" @click="closeBanner">
                <div class="exit-button"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['error'],
  components: { },
  setup() {

  },
  methods: {

    closeBanner(){
        
    this.$emit('closeBanner')
    }

   
  }
}
</script>

<style>

</style>