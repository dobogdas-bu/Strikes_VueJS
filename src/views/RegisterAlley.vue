<template>

    <form @submit.prevent="handleSubmit" class="form">
      
        <Banner v-if="submitted" @closeBanner="()=>{submitted=false
            error = null}"/>
        <Banner v-if="error" :error="error" @closeBanner="()=>{submitted=false
            error = null}"/>
        <h2>Register Alley</h2>
        <div class="div-form-component">
            <label for="alley-name" class="input-form-field">Alley Name:</label><input type="text" id="alley-name"
                v-model="alleyName" required>
        </div>
        <div class="div-form-component">
            <label for="alley-address" class="input-form-field">Alley Address:</label><input type="text" id="alley-address"
                v-model="alleyAddress" required>
        </div>
        <div class="div-form-component">
            <label for="city" class="input-form-field">City:</label><input type="text" id="city"
                v-model="city" required>
        </div>
        <div class="div-form-component">
            <label for="openTime" class="input-form-field">Open Time</label>
                <TimePicker @updateOpen="updateOpen" :open="open"/>
        </div>
        <div class="div-form-component">
            <label for="closeTime" class="input-form-field" >Close Time:</label>
                <TimePicker @updateClose="updateClose" :close="close"/>
        </div>
        <div class="div-form-component">
            <label for="contact-name" class="input-form-field">Contact Name:</label><input type="text" id="contact-name"
                v-model="contactName" required>
        </div>
        <div class="div-form-component">
            <label for="contact-phone" class="input-form-field">Contact Phone:</label><input type="tel" id="contact-phone"
                v-model="contactPhone" required>
        </div>
        <div class="div-form-component">
            <label for="contact-email" class="input-form-field">Contact Email:</label><input type="email" id="contact-email"
                v-model="contactEmail" required>
        </div>

        <div class="div-form-submit">
            <button id="submit">Register Alley</button>
        </div>


    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Banner from '../components/Banner.vue'
import registerAlley from '@/composables/registerAlley'
import TimePicker from '../components/TimePicker.vue'

export default {
    components: {Banner, TimePicker},

    setup() {


        const router = useRouter()
        //refs for form fields
        const alleyName = ref('')
        const alleyAddress = ref('')
        const contactName = ref('')
        const contactPhone = ref('')
        const contactEmail = ref('')
        const openTime = ref('')
        const closeTime = ref('')
        const city = ref('')      

        const submitted = ref(false)
        const open = 'open'
        const close = 'close'


        const {alleyId, error, load} = registerAlley()

        //update open time value based on select box change
         function updateOpen(time){

            openTime.value = time.time + time.amPm

            console.log(openTime.value)
     
        }
        //update close time value based on select box change
        function updateClose(time){

            closeTime.value = time.time + time.amPm
            console.log(closeTime.value)
        }

        const handleSubmit = async () => {
            let alley = {
                alleyName: alleyName.value,
                streetAddress: alleyAddress.value,
                city: city.value,
                contactName: contactName.value,
                phoneNumber: contactPhone.value,
                email: contactEmail.value,
                openTime: openTime.value,
                closeTime: closeTime.value
            
            }
            console.log(alley)
            
            await load(alley)
            //check if user object is returned, adjust banner logic accordingly and reset fields


            if(alleyId.value){
                    submitted.value = true
                    alleyName.value = null
                    alleyAddress.value = null
                    contactName.value = null
                    contactPhone.value = null
                    contactEmail.value = null
                    openTime.value = null
                    closeTime.value=null
                    city.value = null
            }

        }

   
        return { alleyName, alleyAddress, contactName, contactPhone, contactEmail, handleSubmit, submitted, alleyId, error, openTime, closeTime, city, updateOpen,updateClose, open, close}
    },




}
</script>

<style></style>