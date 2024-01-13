<template>
    <div>
    <section>    
    <form @submit.prevent="handleSubmit" class="form">
        <!-- <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }"><p>Account created. You are now logged in.</p></Banner> -->
        <Banner v-if="error" :error="error" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        <h2>Create Account</h2>
        <div class="div-form-component">
            <label for="firstName" class="input-form-field">First Name:</label><input type="text" id="firstName"
                v-model="firstName" placeholder="First Name" required>
        </div>
        <div class="div-form-component">
            <label for="lastName" class="input-form-field">Last Name:</label><input type="text" id="lastName"
                v-model="lastName" placeholder="Last Name" required>
        </div>

        <div class="div-form-component">
            <label for="regEmail" class="input-form-field">Email:</label><input type="text" id="regEmail" v-model="regEmail"
            placeholder="Email" required>
        </div>
        <div class="div-form-component">
            <label for="regPhone" class="input-form-field">Phone:</label><input type="tel" id="regPhone" v-model="regPhone"
            placeholder="Phone (Optional)">
        </div>
        <div class="div-form-component">
            <label for="regPassword" class="input-form-field">Password:</label><input type="password" id="regPassword" autocomplete="new-password"
                v-model="regPassword" placeholder="Password" required>
        </div>
        <div class="div-form-submit">
            <button id="submit">Register</button>
        </div>
    </form>
</section>
<section>
<h4>Already have an account?</h4>
<Login />
</section>
</div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Login from '@/components/Login.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import registerUser from '../composables/registerUser'
import login from '@/composables/login'
import { useUserStore } from '@/stores/UserStore'
export default {
    components: { Banner, Login },
    setup() {
        const userStore = useUserStore()
        const firstName = ref(null)
        const lastName = ref(null)
        const regEmail = ref(null)
        const regPassword = ref(null)
        const submitted = ref(false)
        const router = useRouter()
        const regPhone = ref(null)


        const { userId, error, load } = registerUser()
        const { user ,errorLogin, loadLogin } = login()

        const handleSubmit = async () => {

            let newUser = {
                firstName: firstName.value,
                lastName: lastName.value,
                phone: regPhone.value,
                email: regEmail.value,                
                password: regPassword.value
                
            }
            
            await load(newUser)
            //check if user object is returned, adjust banner logic accordingly and reset fields
            if(userId.value){
                submitted.value = true
                firstName.value = null
                lastName.value = null
                regPassword.value = null
                regEmail.value = null,
                regPhone.value = null,
                await loadLogin({"email":newUser.email, "password": newUser.password})
                if(user){
                    userStore.setUser(user.value)
                }
                router.push('./')
            }    
        }







        return { firstName, lastName, regPhone, regEmail, regPassword, handleSubmit, submitted, error, userId, userStore}

    }

}




</script>

<style></style>