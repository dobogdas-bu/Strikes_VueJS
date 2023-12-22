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


                <router-link @click="closeMenu" :to="{ name: 'RegisterAlley' }">
                    <li>Register Alley</li>
                </router-link>

                
                <router-link @click="closeMenu" :to="{ name: 'ViewAllScores' }">
                    <li>View All Scores</li>
                </router-link>
                <router-link v-if="!userStore.stateToken" @click="closeMenu" :to="{ name: 'Register' }">
                    <li>Create Account</li>
                </router-link>
                <router-link v-if="!userStore.stateToken" @click="closeMenu" :to="{ name: 'Login' }">
                    <li id="li-login"><button @mouseover="showLogin = true" id="loginBtn">Login</button> </li>
                </router-link>
                <router-link @click="closeMenu" :to="{ name: 'Profile' }" @mouseover="showAccount=true" v-else>
                    <li class="account"><span class="material-symbols-outlined">
                            account_circle
                        </span><span>My Account</span></li>
                </router-link>
            </ul>


        </nav>
    </header>
    <div @click="closeMenu" id="login-container" @mouseleave="showLogin = false" v-if="showLogin">
        <Login ref="login" @closeModal="() => { showLogin = false }" />
    </div>
    <div @click="closeMenu" id="login-container" @mouseleave="showAccount=false" v-if="showAccount">
        <ProfileModal @closeModal="()=>{ showAccount=false}"/>
    
    </div>
</template>

<script setup>
import Login from './Login.vue';
import ProfileModal from './ProfileModal.vue';
import { ref, defineEmits } from 'vue';
import { useUserStore } from "../stores/UserStore"
const userStore = useUserStore()
const showLogin = ref(null)
const showAccount = ref(null)




// onMounted(() => {

//   console.log('Component is mounted!');
// });
// if(userStore.stateToken){
//     loggedIn.value = true
// }



function closeMenu() {
    document.querySelector('#menu-toggle').click()

}


</script>

<style scoped></style>