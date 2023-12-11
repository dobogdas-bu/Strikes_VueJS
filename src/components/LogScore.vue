<template>
    <section>
        <h2>Log a Score</h2>
        <form @submit.prevent="handleSubmit" class="form">
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

                <select @change="handleChange"  id="selectUserId" required>
                    <option class="input-form-field" selected disabled value="">Select a Player</option>                  
                    <option class="input-form-field"  v-for="player in players" :key=player.user_id :value="player.user_id">{{ player.first_name }} {{ player.last_name }}</option>
                    
                </select>
            </div>
            <div class="div-form-component">
                <label for="totalScore" class="input-form-field">Total Score:</label><input type="number" step="1" max="300"
                    min="0" id="totalScore" v-model="totalScore" required>
            </div>
            <div class="div-form-component">
                <label for="gameId" class="input-form-field">GameID (for testing purposes):</label><RouterLink :to="{ name: 'Games' }">Add New Game</RouterLink>
                <select @change="handleChange"  id="selectGameId" required>
                    <option class="input-form-field" selected disabled value="">Select a Game</option>                  
                    <option class="input-form-field"  v-for="game in games" :key=game.game_id :value="game.game_id">{{ game.game_id }}</option>                    
                </select>
            </div>
            <div class="div-form-component">
                <label for="user" class="input-form-field">User ID (for testing purposes):</label>
                <input type="text"
                    step="1" max="300" min="0" id="userId" value="1" v-model="userId" readonly>
            </div>

            <div class="div-form-submit">
                <button id="submit">Submit</button>
            </div>


        </form>
    </section>
</template>

<script setup>
import addScore from '@/composables/addScore';
import getPlayers from '@/composables/getPlayers'
import getGames from '@/composables/getGames'
import Banner from '../components/Banner.vue'
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['updateScores'])
const name = ref('')
const totalScore = ref('')
const submitted = ref(false)


//populate players for dropdown, get players composable and destructure
const { players, errorPlayers, loadPlayers } = getPlayers()
loadPlayers()
const userId = ref('')
const gameId=ref('')
// update userId based on selected value 



//populate games for dropdown
const { games, errorGames, loadGames}= getGames()
loadGames()




function handleChange(){    
    userId.value = selectUserId.value   
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
        selectUserId.value = null
        selectGameId.value = null
        userId.value = null
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