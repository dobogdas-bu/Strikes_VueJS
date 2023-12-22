<template>
    <Landing v-if="sessionStore.showLanding"/>
    <!-- route to view all scores if users isn't logged in -->
    
    <Scores :filter="'league'" :key="compKey" v-if="!sessionStore.showLanding && userStore.stateUser"><h2 class="stats">League Play</h2></Scores>
    <Scores :filter="'all'" :key="compKey" v-if="!sessionStore.showLanding && userStore.stateUser"><h2 class="stats">All Time</h2></Scores>
    <Scores :filter="'single'" @noScores="()=>{ showScores = false}" :key="compKey" v-if="userStore.stateUser && showScores"><h2 class="stats">My top scores</h2></Scores>
    <ViewAllScores v-if="!sessionStore.showLanding && !userStore.stateUser"></ViewAllScores>
    <LogScore @updateScores="forceRender" v-if="userStore.stateUser"/>
    <section v-if="userStore.stateUser"><ProfileModal/></section>
    
    <!-- stats component? configure dashboard in settings? -->

</template>

<script setup>


import Scores from '../components/Scores.vue'

import LogScore from '../components/LogScore.vue'
import Landing from './Landing.vue'
import { useUserStore } from '@/stores/UserStore'
import { ref, defineEmits } from 'vue'
const emit = defineEmits()
import { useSessionStore } from '@/stores/SessionStore'
import ProfileModal from '@/components/ProfileModal.vue'
import ViewAllScores from './ViewAllScores.vue'
const sessionStore = useSessionStore()
const showScores = ref(true)


const userStore = useUserStore()
const compKey = ref(0)
function forceRender() {

    compKey.value += 1
    showScores.value = true
}







</script>

<style></style>