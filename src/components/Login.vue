<template>
    <form @submit.prevent="handleSubmit" class="form">        
        <slot><h2>Login</h2></slot>
        <Banner :error="errorLogin" v-if="errorLogin" @closeBanner="() => {
            errorLogin=null
            password = null
            email = null
                        
        }" />

        <div class="div-form-component">
            <label for="email" class="input-form-field">Email:</label><input type="text" id="email"
                v-model="email" placeholder="Email" required>
        </div>
        <div class="div-form-component">
            <label for="password" class="input-form-field">Password:</label><input type="password" id="password"
                v-model="password" placeholder="Password" required>
        </div>
        <div class="div-form-submit">
            <button id="login">Login</button>
            <router-link id="create-account-link" @click="()=>{emit('closeModal')
        sessionStore.setLanding(false)}" :to="{ name: 'Register' }"><span>Create Account</span></router-link>
        </div>

    </form>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import login from '../composables/login'
import {useUserStore} from "../stores/UserStore"
import { useSessionStore } from '@/stores/SessionStore'



        
        const router = useRouter()
        const userStore = useUserStore()
        const sessionStore = useSessionStore()
        const email = ref('')
        const password = ref('')
        const emit = defineEmits(['closeModal'])
        


        const { user ,errorLogin, loadLogin } = login()


        const handleSubmit = async () => {
            let u = {
                password: password.value,
                email: email.value
                
            }
            
            await loadLogin(u)
            
            
            if(user.value){
                password.value = ''
                email.value=''
                emit('closeModal')
                
            }
            if(errorLogin.value){

            }

            userStore.setUser(user.value)
            sessionStore.setLanding(false)
            
            router.push('/')

        }


</script >

<style scoped>
.error-banner {
    margin-top: 10px;
}
.div-form-submit {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
    align-items: baseline;

}
#create-account-link {

    text-decoration: none;
}
span{
    
    margin-left: 7px;
    color: white;
    
}
span:hover {
    cursor: pointer;
    color: #F812F1;
}

#create-account-link{
    margin-top: 15px;
}
</style>