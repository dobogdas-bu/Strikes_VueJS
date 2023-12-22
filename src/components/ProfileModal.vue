<template>
    <div class="profile-modal">
        <h2>Profile</h2>
        <p>Hello, {{ userStore.stateUser.first_name}}</p>
    <br />
        <router-link id="profile-link" @click="closeModal" :to="{ name: 'Profile' }"><span><u>Manage Account</u></span></router-link>
        <p>Games Logged: {{ userStore.stats.gamesLogged}}</p>
        <p>Total Score: {{ userStore.stats.totalScore }}</p>
        <p>Score per Game: {{  userStore.stats.average }}</p>
        
        <p>Favorite Alley: Roll House</p>
        <span @click="handleLogout"><u>Logout</u></span>
    </div>
</template>

<script setup>

import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "../stores/UserStore"
import logout from '../composables/logout'
const userStore = useUserStore()
const router = useRouter()
const userName = userStore.stateUser.first_name;
const emit = defineEmits(['closeModal'])
const closeModal = () => {
    emit('closeModal')
}
const { res, errorLogout, loadLogout } = logout()

const handleLogout = async () => {


    await loadLogout()


    emit('closeModal')
    userStore.setUser('')


    router.push('/')

}







</script>

<style scoped>
span{
    
    
    
}
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