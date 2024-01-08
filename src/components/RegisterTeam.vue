<template>
    
           
    <form @submit.prevent="handleSubmit" class="form">
        <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }"><p>Team successfully created.</p></Banner>
        <Banner v-if="error" :error="error" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        <h2>Create Team</h2>
        <div class="div-form-component">
            <label for="teamName" class="input-form-field">Team Name:</label><input type="text" id="teamName"
                v-model="teamName"  required>
        </div>
        <div class="div-form-component">
            <label for="contactName" class="input-form-field">Contact Name:</label><input type="text" id="contactName"
                v-model="contactName" required>
        </div>

        <div class="div-form-component">
            <label for="email" class="input-form-field">Contact Email:</label><input type="text" id="email" v-model="email"
                required>
        </div>
        <div class="div-form-component">
            <label for="phone" class="input-form-field">Contact Phone:</label><input type="tel" id="phone"
                v-model="phone" required>
        </div>
        <div class="div-form_component toggle">
            <label for="access" class="input-form-field switch">
                <input id = "access" type="checkbox" v-model="isChecked">
                <span class="slider round"></span>                
            </label>
            <label class="input-form-field flex">{{ isChecked ? 'Public Team' : 'Private Team' }}</label>
            
        </div>
        <div class="div-form-submit">
            <button id="submit">Register Team</button>
        </div>
    </form>

    
</template>

<script setup>
import { ref, watchEffect, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import registerTeam from '../composables/registerTeam'
import Banner from './Banner.vue';
const emit = defineEmits(['registered'])
const userStore = useUserStore()
const router = useRouter()
const submitted = ref(null)
const teamName = ref('')
const contactName = ref(userStore.stateUser.first_name +' '+ userStore.stateUser.last_name)
const phone = ref('')
const email = ref(userStore.stateUser.email)
const access = ref('')
const isChecked = ref(false)

const {response, error, loadRegisterTeam} = registerTeam()


const handleSubmit = async ()=>{
    access.value = isChecked ? 'O' : 'P'
const team = {
    teamName : teamName.value,
    contactName: contactName.value,
    phone: phone.value,
    email: email.value,
    userId: userStore.stateUser.user_id,
    accessFlag: access.value

}

    await  loadRegisterTeam(team)
    if (response.value){
        submitted.value = true
        teamName.value = ''
        phone.value = ''
        isChecked.value = false
        emit('registered')
        // add new team Id to users State
    }    


}


</script>

<style scoped>

</style>