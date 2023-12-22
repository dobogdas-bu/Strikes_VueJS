<template>
    <div>
        {{ user }}
    </div>
</template>

<script setup>
import { useRoute} from 'vue-router'
import getUser from '../composables/getUser.js'

const route = useRoute()
// const { errorUser, user, loadUser } = getUser()
// loadUser(route.params.id)




</script>

<style scoped>

</style>