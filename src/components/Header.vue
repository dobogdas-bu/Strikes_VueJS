<template>
    <header v-if="!landing">
        <router-link :to="{ name: 'Home' }" id="home-link">
            <img id="logo-image" src="../assets/images/logo.png" title="logo" alt="logo">
        </router-link>
        <nav class="main-navlist">
            <input id="menu-toggle" type="checkbox">
            <label class="menu-button-container" for="menu-toggle">
                <div class="menu-button"></div>
            </label>
            <ul class="nav-ul">

                <router-link @click="closeMenu" :to="{ name: 'Home' }">
                    <li>Home</li>
                </router-link>


                <router-link @click="closeMenu" :to="{ name: 'Locations' }">
                    <li>Locations</li>
                </router-link>


                <router-link @click="closeMenu" :to="{ name: 'HowToPlay' }">
                    <li>How to Play</li>
                </router-link>


                <!-- <router-link @click="closeMenu" :to="{ name: 'RegisterAlley' }">
                    <li>Register Alley</li>
                </router-link> -->


                <router-link @click="closeMenu" :to="{ name: 'ViewAllScores' }">
                    <li>View All Scores</li>
                </router-link>
                <router-link v-if="!userStore.stateToken" @click="closeMenu" :to="{ name: 'Register' }">
                    <li>Create Account</li>
                </router-link>
                <router-link v-if="!userStore.stateToken" @click="closeMenu" :to="{ name: 'Login' }">
                    <li id="li-login"><button @mouseover="showLogin = true" id="loginBtn">Login</button> </li>
                </router-link>
                <router-link @click="closeMenu" :to="{ name: 'Profile' }" @mouseover="showAccount = true" v-else>
                    <li class="account"><span class="material-symbols-outlined">
                            account_circle
                        </span><span id="myAccount">My Account</span>
                    </li>
                </router-link>

            </ul>

        </nav>
    </header>
    <nav :class="mobileNav">
        <span>Hello, {{ firstName}}</span>
        <span @click="()=>{router.push('./profile')}" class ="logout-link">My Account</span>
        <span @click="()=>{router.push('./log')}" class="logout-link">Log a Score</span>
        <span class="logout-link" @click="handleLogout">Logout</span>

    </nav>
    
    <div @click="closeMenu" id="login-container" @mouseleave="showLogin = false" v-if="showLogin">
        <Login ref="login" @closeModal="() => { showLogin = false }" />
    </div>
    <div @click="closeMenu" id="login-container" @mouseleave="showAccount = false" v-if="showAccount">
        <ProfileModal @closeModal="() => { showAccount = false }" />

    </div>
</template>

<script setup>
import Login from './Login.vue';
import ProfileModal from './ProfileModal.vue';
import { ref, defineEmits } from 'vue';
import { useUserStore } from "../stores/UserStore"
import logout from '@/composables/logout';
import { watchEffect } from 'vue';
const userStore = useUserStore()
const showLogin = ref(null)
const showAccount = ref(null)
import { useRouter } from 'vue-router';
const router = useRouter()
const firstName = ref('')
const mobileNav = ref('mobileNavHidden')



if (userStore.stateUser.first_name) firstName.value = userStore.stateUser.first_name

watchEffect(() => {
    if(userStore.stateToken && userStore.stateUser){
        mobileNav.value = 'mobileNav'
        firstName.value = userStore.stateUser.first_name
    } else {
        mobileNav.value = 'mobileNavHidden'
    }

})


// onMounted(() => {

//   console.log('Component is mounted!');
// });
// if(userStore.stateToken){
//     loggedIn.value = true
// }



function closeMenu() {
    document.querySelector('#menu-toggle').click()

}
const { res, errorLogout, loadLogout } = logout()

const handleLogout = async () => {
    mobileNav.value = "mobileNavHidden"
    firstName.value = ''

    await loadLogout()



    userStore.setUser('')
    userStore.setStats('')
    router.push('/')

    

}

</script>

<style>

</style>