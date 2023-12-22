<template>
    <div class="main-sidenav">
        <nav class="sidenav">
            <span  @click="()=>{ return page = 'profile'}">Profile</span>
            <span  @click="()=>{ return page = 'stats'}">Stats</span>
            <span  @click="()=>{ return page = 'settings'}">Settings</span>
            <span  @click="()=>{ return page = 'teams'}">Teams</span>
            <span  @click="()=>{ return page = 'leagues'}">Leagues</span>
            

        </nav>

        <div class="content" v-if="page === 'profile'">
        <form @submit.prevent="handleSubmit" class="form">
            <Banner v-if="submitted" @closeBanner="() => {
                submitted = false
                error = null
            }"><p>Profile Updated</p></Banner>
            <Banner v-if="error" :error="error" @closeBanner="() => {
                submitted = false
                error = null
            }"><p>There was an error processing your request</p></Banner>
            <h2>Profile</h2>
            <div class="div-form-component">
                <label for="firstName" class="input-form-field">First Name:</label><input type="text" id="firstName"
                    v-model="firstName" :readonly="readOnly" required>
            </div>
            <div class="div-form-component">
                <label for="lastName" class="input-form-field">Last Name:</label><input type="text" id="lastName"
                    v-model="lastName" :readonly="readOnly" required>
            </div>

            <div class="div-form-component">
                <label for="email" class="input-form-field">Email:</label><input type="text" id="email" v-model="email"
                :readonly="readOnly" required>
            </div>

            <div v-if="readOnly" class="div-form-submit">
                <button @click="()=>{ readOnly=!readOnly}" id="edit">Edit Profile</button>
            </div>
            <div v-else class="div-form-submit-cancel">
                <button id="submit">Update</button>
                <button @click="()=>{ readOnly=!readOnly}" class="cancel-button" id="cancel">Cancel</button>
            </div>
        </form>
    </div>
    <div v-if="page === 'stats'"><UserStats /></div>
    <!-- delete history, payment methods, etc -->
    <div v-if="page === 'settings'"><p>settings will be here ... </p></div>
    <!-- include link to add a team/ manage team -->
    <div v-if="page === 'teams'"><p>teams will be here</p></div>
    <!-- add league  management if authed such as accept team request request -->
    <div v-if="page === 'leagues'"><p>leagues will be here, </p></div>
    <!-- alley config will be here, add alley management if authed -->
    <div v-if="page === 'alleys'"><p>Alleys!</p></div>

    
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import Banner from '../components/Banner.vue'
import UserStats from './UserStats.vue';
import updateUser from '../composables/updateUser'

const submitted = ref(null)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const router = useRouter()
const readOnly=ref(true)
const page= ref('profile')



const { response, error, load } = updateUser()


const userStore = useUserStore()
if(!userStore.stateToken){
    router.push('/')
} else {
firstName.value = userStore.stateUser.first_name
lastName.value = userStore.stateUser.last_name
email.value = userStore.stateUser.email

}

const handleSubmit = async ()=>{

    const userData = {
        user_id : userStore.stateUser.user_id,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value

    }
   
        await  load(userData)
        if (response.value){
            submitted.value = true
            readOnly.value = true
            userStore.stateUser.first_name = firstName.value
            userStore.stateUser.last_name = lastName.value
            userStore.stateUser.email = email.value
        }    
    





}



</script>

<style scoped>

span {
    margin-bottom: 15px;
    border-bottom: 1px solid;
    width: 90%;
    padding-bottom: 10px;
    padding-top: 5px;
    padding-left:5px;
    border-radius: 2px 2px 0 0;
    font-weight: 600;;
    /* background: linear-gradient(rgb(255, 255, 255) 60%, #34455f);
    box-shadow: -2px 3px 4px 4px #34455fad; */

}

span:hover{
    transition: .25s ease;
    border: none;
    color: white;
    background: rgb(178, 129, 223);  
    border-radius: 3px;
    cursor: pointer;
    box-shadow: -2px 2px 4px 4px rgb(178, 129, 223);
}


@media all and (max-width: 50em) {

.sidenav span{
margin-bottom: 8px;
}
.content {
    width: 100%;
}

span:hover{
    transition: .25s ease;
    border: none;
    color: white;
    background: rgb(178, 129, 223);  
    border-radius: 3px;
    cursor: pointer;
   
    
}


}
</style>