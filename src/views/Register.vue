<template>
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
                v-model="firstName" required>
        </div>
        <div class="div-form-component">
            <label for="lastName" class="input-form-field">Last Name:</label><input type="text" id="lastName"
                v-model="lastName" required>
        </div>
        <div class="div-form-component">
            <label for="phone" class="input-form-field">Phone Number:</label><input type="tel" id="phone"
                v-model="phone" required>
        </div>
        <div class="div-form-component">
            <label for="email" class="input-form-field">Email:</label><input type="text" id="email" v-model="email"
                required>
        </div>
        <div class="div-form-submit">
            <button id="submit">Register</button>
        </div>


    </form>
</template>

<script>
import Banner from '../components/Banner.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import registerUser from '../composables/registerUser'

export default {
    components: { Banner },
    setup() {
        const router = useRouter()
        const firstName = ref('')
        const lastName = ref('')
        const email = ref('')
        const phone = ref('')
        const submitted = ref(false)


        const { userId, error, load } = registerUser()


        const handleSubmit = async () => {
            let user = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value
            }
            
            await load(user)
            //check if user object is returned, adjust banner logic accordingly and reset fields
            if(userId.value){
                submitted.value = true
                firstName.value = null
                lastName.value = null
                phone.value = null
                email.value = null

            }
        }





        return { firstName, lastName, email, handleSubmit, submitted, error, userId, phone}

    }

}




</script>

<style></style>