<template>
    <section>
        <h2>Log a Score</h2>
        <div v-if="!games.length" class="spinner"></div>
        <form @submit.prevent="handleSubmit" class="form" v-else>
            <Banner v-if="submitted" @closeBanner="() => {
                submitted = false
                error = null
            }" />
            <Banner v-if="error" :error="error" @closeBanner="() => {
                submitted = false
                error = null
            }" />
            <div class="div-form-component">
                <label for="name" class="input-form-field">Name:</label>
                <input type="text" readonly v-model="name" read-only>

            </div>
            <div class="div-form-component">
                <label for="totalScore" class="input-form-field">Total Score:</label><input type="number" step="1" max="300"
                    min="0" id="totalScore" v-model="totalScore" required>
            </div>
            <div class="div-form-component">
                <label for="gameId" class="input-form-field">GameID (for testing purposes):</label><RouterLink :to="{ name: 'Games' }">Add New Game</RouterLink>
                <select @change="handleChange"  id="selectGameId" required>
                    <option class="option" selected disabled value="">Select a Game</option>                  
                    <option class="option"  v-for="game in games" :key=game.game_id :value="game.game_id">{{ game.game_id }}</option>                    
                </select>
            </div>
            <div class="div-form-submit">
                <button id="submit">Submit</button>
            </div>


        </form>
    </section>
</template>

<script setup>
import addScore from '@/composables/addScore';
import getUsers from '@/composables/getUsers'
import getGames from '@/composables/getGames'
import Banner from '../components/Banner.vue'
import { useUserStore } from '@/stores/UserStore';
import { ref, defineEmits } from 'vue'
const userStore = useUserStore()
const emit = defineEmits(['updateScores'])
const name = ref(userStore.stateUser.first_name +' '+ userStore.stateUser.last_name)
const totalScore = ref('')
const submitted = ref(false)


//populate players for dropdown, get players composable and destructure
// const { players, errorPlayers, loadPlayers } = getUsers()
// loadPlayers()
const userId = ref('')
const gameId=ref('')
// update userId based on selected value 



//populate games for dropdown
const { games, errorGames, loadGames}= getGames()
loadGames()




function handleChange(){    
    userId.value = userStore.stateUser.user_id 
}

// dummy frames data for fetch request
const framesJson = {
    "frames": {
        "1": { "1": 4, "2": 5 }, "2": { "1": 10 }, "3": { "1": 4, "2": 4 },
        "4": { "1": 2, "2": 3 }, "5": { "1": 4, "2": 5 }, "6": { "1": 4, "2": 10 }, "7": { "1": 4, "2": 4 },
        "8": { "1": 4, "2": 5 }, "9": { "1": 10 }, "10": { "1": 4, "2": 4, "3": 5 }
    }
}
const frames = ref('')



// get addScore composable and destructure
const { scoreId, error, load } = addScore()


const handleSubmit = async () => {
    
    frames.value = JSON.stringify(framesJson)
    let score = {
        totalScore: totalScore.value,
        userId: userId.value,
        frames: frames.value,
        gameId: selectGameId.value
    }
    await load(score)

    //check if score object is returned, adjust banner logic accordingly and reset fields
    if (scoreId.value) {
        submitted.value = true
        
        selectGameId.value = null
        
        totalScore.value = null
        emit('updateScores')

    }
}



</script>

<style>
form {

    padding: 10px;
}

.div-form-component input {
    box-sizing: border-box;
    width: 100%;
}</style>