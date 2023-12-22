<template>
    <div>
    <section>    
    <form @submit.prevent="handleSubmit" class="form">
        <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        <Banner v-if="error" :error="error" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        <h2>Create Account</h2>
        <div class="div-form-component">
            <label for="firstName" class="input-form-field">First Name:</label><input type="text" id="firstName"
                v-model="firstName"  required>
        </div>
        <div class="div-form-component">
            <label for="lastName" class="input-form-field">Last Name:</label><input type="text" id="lastName"
                v-model="lastName" required>
        </div>

        <div class="div-form-component">
            <label for="regEmail" class="input-form-field">Email:</label><input type="text" id="regEmail" v-model="regEmail"
                required>
        </div>
        <div class="div-form-component">
            <label for="regPassword" class="input-form-field">Password:</label><input type="password" id="regPassword"
                v-model="regPassword" required>
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

export default {
    components: { Banner, Login },
    setup() {
        
        const firstName = ref('')
        const lastName = ref('')
        const regEmail = ref('')
        const regPassword = ref('')
        const submitted = ref(false)


        const { userId, error, load } = registerUser()


        const handleSubmit = async () => {
            let user = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: regEmail.value,
                password: regPassword.value
                
            }
            
            await load(user)
            //check if user object is returned, adjust banner logic accordingly and reset fields
            if(userId.value){
                submitted.value = true
                firstName.value = null
                lastName.value = null
                regPassword.value = null
                regEmail.value = null

            }
        }





        return { firstName, lastName, regEmail, regPassword, handleSubmit, submitted, error, userId}

    }

}




</script>

<style></style>