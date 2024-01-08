<template>
    <form @submit.prevent="handleSubmit" class="form">
        <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }">
            <p>League successfully created.</p>
        </Banner>
        <Banner v-if="error" :error="error" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        <h2>Create League</h2>
        <div class="div-form-component">
            <label for="leagueName" class="input-form-field">League Name:</label><input type="text" id="leagueName"
                v-model="leagueName" required>
        </div>
        <div class="div-form-component">
            <label for="adminName" class="input-form-field">Admin Name:</label><input type="text" id="adminName"
                v-model="adminName" required>
        </div>

        <div class="div-form-component">
            <label for="email" class="input-form-field">Contact Email:</label><input type="text" id="email" v-model="email"
                required>
        </div>
        <div class="div-form-component">
            <label for="phone" class="input-form-field">Contact Phone:</label><input type="tel" id="phone" v-model="phone"
                required>
        </div>
        <div class="div-form-component">
            <label for="startDate" class="input-form-field">Start Date:</label><input type="date" id="startDate"
                v-model="startDate">
        </div>
        <div class="div-form-component">
            <label for="endDate" class="input-form-field">End Date:</label><input type="date" id="endDate"
                v-model="endDate">
        </div>
        <div class="div-form-component">
            <label for="skill" class="input-form-field">Skill Level:</label><input type="text" id="skill" v-model="skill"
                disabled>
        </div>
        <div class="div-form_component toggle">
            <label for="access" class="input-form-field switch">
                <input id = "access" type="checkbox" v-model="isChecked">
                <span class="slider round"></span>                
            </label>
            <label class="input-form-field flex">{{ isChecked ? 'Public League' : 'Private League' }}</label>
            
        </div>
        <div class="div-form-submit">
            <button id="submit">Register League</button>
        </div>
    </form>
</template>

<script setup>
import { ref, watchEffect, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import registerLeague from '@/composables/registerLeague';
import Banner from './Banner.vue';
const userStore = useUserStore()
const router = useRouter()
const submitted = ref(null)
const leagueName = ref('')
const adminName = ref(userStore.stateUser.first_name + ' ' + userStore.stateUser.last_name)
const email = ref(userStore.stateUser.email)
const phone = ref('')
const startDate = ref('')
const endDate = ref('')
const access = ref('')
const skill = ref(null)
const isChecked = ref(false)



const { response, error, loadRegisterLeague } = registerLeague()



const handleSubmit = async () => {
    access.value = isChecked ? 'O' : 'P'
    const league = {
        leagueName: leagueName.value,
        adminName: adminName.value,
        phone: phone.value,
        email: email.value,
        startDate: startDate.value,
        endDate: endDate.value,
        skillLevel: skill.value,
        adminUserId: userStore.stateUser.user_id,
        access : access.value
        

    }

    await loadRegisterLeague(league)
    if (response.value) {
        submitted.value = true
        leagueName.value = ''
        adminName.value = ''
        email.value = ''
        phone.value = ''
        startDate.value = ''
        endDate.value = ''
        isChecked.value = false;

        // add new team Id to users State
    }

}
</script>

<style></style>