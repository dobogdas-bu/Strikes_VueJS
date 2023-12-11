<template>
    <section>
        <h2>Add New Game</h2>
        <form @submit.prevent="handleSubmit" class="form">
            <Banner v-if="submitted" @closeBanner="() => {
                submitted = false
                errorAddGame = null
            }" />
            <Banner v-if="errorAddGame" :error="errorAddGame" @closeBanner="() => {
                submitted = false
                errorAddGame = null
            }" />
            <div class="div-form-component-rb">
                <label for="existingReservation" class="input-form-field">Use Existing Reservation?</label>
                <label for="yes">Yes</label>
                <input type="radio" id="yes" v-model="existing" class="rb" name="existingReservation" :value=true>
                <label for="no">No</label>
                <input type="radio" id="no" v-model="existing" class="rb" name="existingReservation" :value=false>
            </div>
            <div class="div-form-component" v-if="existing === true">
                <select id="selectReservation" v-model="reservationId" required>
                    <option class="input-form-field" selected disabled value="">Select Reservation Id:</option>
                    <option class="input-form-field" v-for="reservation in reservations" :key=reservation.reservation_id
                        :value="reservation.reservation_id">{{ reservation.reservation_id }}</option>
                </select>
            </div>
            <div v-else>
                <div class="div-form-component">
                    <label for="date" class="input-form-field">Reservation Date:</label>
                    <input type="date" id="date" v-model="date" />
                </div>

                <label class="input-form-field">Reservation Details</label>
                <div class="div-form-component">
                    <label for="startTime" class="input-form-field">Start Time</label>
                    <TimePicker @updateOpen="updateOpen" :open="open" />
                </div>
                <div class="div-form-component">
                    <label for="endTime" class="input-form-field">End Time:</label>
                    <TimePicker @updateClose="updateClose" :close="close"/>
                </div>
                <div class="div-form-component">
                <label for="league" class="input-form-field">Select a League (if applicable)</label>
                <select id="league" v-model="leagueId">
                    <option class="input-form-field" selected value="">Select a League (if applicable)</option>                  
                    <option class="input-form-field"  v-for="league in leagues" :key=league.league_id :value="league.league_id">{{ league.league_name }}</option>
                    
                </select>
                </div>
            </div>
            <div class="div-form-component">                
                <label for="alley" class="input-form-field">Select an Alley</label>
                <select id="alley" v-model="alleyId">
                    <option class="input-form-field" selected disabled value="">Select an Alley</option>                  
                    <option class="input-form-field"  v-for="alley in alleys" :key=alley.alley_id :value="alley.bowling_alley_id">{{ alley.alley_name  }}</option>
                    
                </select>
                


            </div>

            <div class="div-form-submit">
                <button id="submit">Submit</button>
            </div>


        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import getReservations from '@/composables/getReservations'
import getLeagues from '@/composables/getLeagues'
import getAlleys from '@/composables/getAlleys'
import addGame from '@/composables/addGame'
import TimePicker from './TimePicker.vue';
import Banner from './Banner.vue';
const existing = ref(false)
const reservationId = ref('')
const submitted = ref(false)
const open = 'open'
const close = 'close'
const startTime= ref('')
const endTime= ref('')
const date = ref('')
const alleyId=ref('')
const leagueId=ref('')

const { reservations, errorReservations, loadReservations } = getReservations()
const { leagues, errorLeagues, loadLeagues} = getLeagues()
const {alleys, errorAlleys, loadAlleys} = getAlleys()
const {gameId, errorAddGame, loadAddGame } = addGame()




loadReservations()
loadLeagues()
loadAlleys()



        //update open time value based on select box change
function updateOpen(time){
startTime.value = time.time + time.amPm

}
//update close time value based on select box change
function updateClose(time){

endTime.value = time.time + time.amPm

}

const handleSubmit = async () => {
    let gameData = null
    console.log(existing)
    if(existing.value){
        gameData = {
        
        reservationId: reservationId.value,
        startDateTime: null,
        endDateTime: null,
        leagueId:null,
        alleyId: alleyId.value

        }
        console.log(gameData)

    } else {

    gameData = {
        
        reservationId:null,
        startDateTime: date.value + " "+ startTime.value,
        endDateTime: date.value + " "+ endTime.value,
        leagueId: leagueId.value,
        alleyId: alleyId.value
        
        }
        console.log(gameData)
    }
    



    
    await loadAddGame(gameData)

    //check if score object is returned, adjust banner logic accordingly and reset fields
    if (gameId.value) {
        existing.value = false;
        startTime.value = null;
        endTime.value = null;
        leagueId.value = null;
        alleyId.value = null;
        submitted.value=true;


    }
}





</script>

<style lang="scss" scoped></style>