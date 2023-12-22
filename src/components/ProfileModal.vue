<template>
    <div class="profile-modal">
        <h2>Profile</h2>
        <p>Hello, {{ userName}}</p>
    <br />
        <router-link id="profile-link" @click="closeModal" :to="{ name: 'Profile' }"><span><u>Manage Account</u></span></router-link>
        <p v-if="gamesLogged">Games Logged: {{ gamesLogged}}</p>
        <p v-if="totalScore">Total Score: {{ totalScore }}</p>
        <p v-if="average">Score per Game: {{  average }}</p>
        
        <p>Favorite Alley: Roll House</p>
        <span @click="handleLogout"><u>Logout</u></span>
    </div>
</template>

<script setup>

import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "../stores/UserStore"
import logout from '../composables/logout'
import { watchEffect } from 'vue'
const userStore = useUserStore()
const router = useRouter()
const userName = userStore.stateUser.first_name;
const gamesLogged = ref(0)
const totalScore = ref(0)
const average = ref(0)



watchEffect(() => {
    if(userStore.stats){
    
    gamesLogged.value = userStore.stats.gamesLogged
    totalScore.value = userStore.stats.totalScore
    average.value = totalScore.value / gamesLogged.value
    }
})


const emit = defineEmits(['closeModal'])
const closeModal = () => {
    emit('closeModal')
}
const { res, errorLogout, loadLogout } = logout()

const handleLogout = async () => {


    await loadLogout()


    emit('closeModal')
    userStore.setUser('')
    userStore.setStats('')


    router.push('/')

}







</script>

<style scoped>

p{
    padding-left:0;
    margin:0;
    padding-top: 3px;
}
span:hover {
    cursor: pointer;
    color: #F812F1;
}

.profile-modal {
    display: flex;
    flex-direction: column;
    padding: 5px;
}
#profile-link {
    color:black;
}



#profile-link:hover {
    color:#F812F1;
}
</style>