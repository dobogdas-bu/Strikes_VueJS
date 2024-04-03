<template>
    <div>
        <p>Games Played: {{ gamesLogged }}</p>
        <p>Total Score: {{ totalScore }}</p>
        <p>Score per Game: {{ averageScore }}</p>
        <!-- <p v-if="!userStore.stats">No stats recorded yet.</p> -->
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';
let gamesLogged
let totalScore
let averageScore
const userStore = useUserStore()
if(userStore.stats){
gamesLogged = ref(userStore.stats.gamesLogged)

totalScore = ref(userStore.stats.totalScore)

averageScore = ref(userStore.stats.average)

} else {
gamesLogged = 0
totalScore = 0
averageScore = 0
}
</script>

<style lang="scss" scoped>

</style>