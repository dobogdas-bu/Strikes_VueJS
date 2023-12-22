<template>
    <div>
        <p>Games Played: {{ gamesLogged }}</p>
        <p>Total Score: {{ totalScore }}</p>
        <p>Score per Game: {{ averageScore }}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';

const userStore = useUserStore()

const gamesLogged = ref(userStore.stats.gamesLogged)
console.log(gamesLogged)
const totalScore = ref(userStore.stats.totalScore)
console.log(totalScore)
const averageScore = ref(userStore.stats.average)
</script>

<style lang="scss" scoped>

</style>