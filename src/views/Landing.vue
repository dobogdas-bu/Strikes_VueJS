<template>
    <img id="landing-logo" alt="strikes logo" src="../assets/images/logo.png">

    <div class="content">
        <p id="welcome">Welcome to Strikes!</p>
        <Login>
            <p><span @click="()=>{ sessionStore.setLanding(false) }">Continue as guest</span></p>
        </Login>
        <span>Forgot Email or Password?</span>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import Login from '@/components/Login.vue';

import { useSessionStore } from '../stores/SessionStore';
const sessionStore = useSessionStore()







</script>

<style scoped>
span {
    color: rgb(178, 129, 223);
    text-decoration: underline;
    
}
span:hover{
    cursor: pointer;
}

p {
    margin: 0 0 0 0;
    padding: 0;
}

.form > p {
    padding-top: 25px;
}

#welcome {
    text-align: center;
    font-size: 2rem;
    margin: 25px 0 15px 0;
}

#landing-logo {
    height: auto;
    width: 50%;
    /* position: fixed; */
    /* top:10%; */
    margin: 0 0 0 0;
    padding: 0 0 0 0;
}

.form {
    width: 100%;
    padding: 0 0 10px 0;
}
.content {
    position: static;
    width: 50%;
    padding:0;
    margin: 0;
}



@media all and (max-width: 50em) {

    .content {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        bottom:10%;
        position:absolute;
        width: 80%;
    }

    .form {
        width: auto;
    }

    #landing-logo {
        height: auto;
        width: 90%;
        position: fixed;
        top:10%;

    }


}
</style>