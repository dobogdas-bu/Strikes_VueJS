<template>
    <section>
        <h2>Register Alley</h2>
    <form @submit.prevent="handleSubmit" class="form">

        <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }"><p>Alley Registered.</p></Banner>
        <Banner v-if="error" :error="error" @closeBanner="() => {
            submitted = false
            error = null
        }" />
        
        <div class="div-form-component">
            <label for="alley-name" class="input-form-field">Alley Name:</label><input type="text" id="alley-name"
                v-model="alleyName"  ref="autoInput" required>
        </div>

        <div class="div-form-component">
            <label for="address" class="input-form-field">Address:</label><input type="text" id="address" placeholder="Street Address"  v-model="address"
                required>
        </div>
        <div class="flex">
            <div class="div-form-component">
                <label for="city" class="input-form-field">City:</label><input type="text" placeholder="City" id="city" v-model="city"
                    required>
            </div>
            <div class="div-form-component">
                <label for="state" class="input-form-field">State:</label><input type="text" placeholder="State" id="state" v-model="state"
                    required>
            </div>
            <div class="div-form-component">
                <label for="zip" class="input-form-field">Zip Code:</label><input type="text" placeholder="Zip Code" id="zip" v-model="zip"
                    required>
            </div>
            <div class="div-form-component">
                <label for="country" class="input-form-field">Country:</label><input type="text" placeholder="Country" id="country"
                    v-model="country" required>
            </div>
        </div>
        <!-- <div class="div-form-component">
            <label for="openTime" class="input-form-field">Open Time</label>
            <TimePicker @updateOpen="updateOpen" :open="open" />
        </div>
        <div class="div-form-component">
            <label for="closeTime" class="input-form-field">Close Time:</label>
            <TimePicker @updateClose="updateClose" :close="close" />
        </div> -->
        <div class="div-form-component">
            <label for="contact-name" class="input-form-field">Contact Name:</label><input type="text" id="contact-name"
                v-model="contactName" placeholder="Contact Name" required>
        </div>
        <div class="div-form-component">
            <label for="contact-phone" class="input-form-field">Contact Phone:</label><input type="tel" id="contact-phone"
                v-model="contactPhone" placeholder="Contact Phone" required>
        </div>
        <div class="div-form-component">
            <label for="email" class="input-form-field">Contact Email:</label><input type="email" id="email"
                v-model="email" placeholder="Contact Email" required>
        </div>

        <div class="div-form-submit">
            <button id="submit">Register Alley</button>
        </div>


    </form>
</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Banner from '../components/Banner.vue'
import registerAlley from '@/composables/registerAlley'
import TimePicker from '../components/TimePicker.vue'
import { loadGoogleMaps, fillInAddress, autocomplete } from '@/composables/google/maps/autocomplete'
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore()

//refs for form fields
const alleyName = ref('')
const address = ref('')

const contactPhone = ref('')

// const openTime = ref('')
// const closeTime = ref('')
const city = ref('')
const state = ref('')
const country = ref('')
const zip = ref('')

const submitted = ref(false)
const open = 'open'
const close = 'close'
const autoInput = ref(null)
const contactName = ref(userStore.stateUser.first_name +' '+ userStore.stateUser.last_name)
const email = ref(userStore.stateUser.email)


onMounted(() => {
    fillInAddress.value = populateAddress
    loadGoogleMaps(autoInput.value);
    
});





const { alleyId, error, load } = registerAlley()



//update open time value based on select box change
function updateOpen(time) {

    openTime.value = time.time + time.amPm



}
//update close time value based on select box change
function updateClose(time) {

    closeTime.value = time.time + time.amPm

}

const handleSubmit = async () => {
    let alley = {
        alleyName: alleyName.value,
        streetAddress: address.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
        country: country.value,
        contactName: contactName.value,
        phoneNumber: contactPhone.value,
        email: email.value,
        userId: userStore.stateUser.user_id

    }


    await load(alley)
    //check if user object is returned, adjust banner logic accordingly and reset fields


    if (alleyId.value) {
        submitted.value = true
        alleyName.value = null
        address.value = null
        contactName.value = null
        contactPhone.value = null
        email.value = null
        city.value = null
        state.value = null
        country.value = null
    }

}



let populateAddress =()=> {
  // Get the place details from the autocomplete object.
  let streetNumber;
  let route;
  const place = autocomplete.getPlace();
    
    alleyName.value = place.name
  for (const component of place.address_components) {
    const componentType = component.types[0];
    console.log(componentType)
    switch (componentType) {
      case "street_number":{
        streetNumber = component.long_name
      }
      case "route": {
        route = component.long_name ;
        break;
      }

      case "locality": {
        city.value += component.long_name;
        break;
      }

      case "postal_code": {
        zip.value = component.long_name;
        break;
      }

      case "administrative_area_level_1":{
        state.value = component.long_name
        break
      }

      case "country":{
        country.value = component.long_name
      }

    }
    address.value = streetNumber + ' ' + route
}
}



</script>

<style></style>