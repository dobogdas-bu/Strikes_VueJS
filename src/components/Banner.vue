<template>
  <div v-if="!error" class="banner">
    <slot>Submitted</slot>
    <div class="exit-button-container" @click="closeBanner">
      <div class="exit-button"></div>
    </div>
  </div>
  <div v-else class="error-banner">
    <p>{{error}}</p>
    <div class="exit-button-container" @click="closeBanner">
      <div class="exit-button"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  components: {},
  setup() {

  },
  methods: {

    closeBanner() {

      this.$emit('closeBanner')
    }


  }
}
</script>

<style></style>