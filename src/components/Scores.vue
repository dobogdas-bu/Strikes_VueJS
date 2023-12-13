<template>
    <section><h2>Top Scores</h2>
        <div v-if="!scores.length" class="spinner"></div>
           <article id="scores" v-else>
            
            <div v-if="error">{{ error }}</div>
            <div v-if="scores.length"></div>

            <h3>All Time</h3>
            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="score in sorted" :key="score.id">
                        <td>{{ score.game_date }}</td>
                        <td>{{ score.first_name }} {{ score.last_name }}</td>
                        <td>{{ score.total_score }}</td>
                    </tr>
                </tbody>
            </table>
            <h3>League Play - Top 10</h3>
            <select v-model="selectLeague" id="selectLeague" class="input-form-field" required>
                <option disabled class="input-form-field">Select a League</option>
                <option selected class="input-form-field">Local League</option>
                <option class="input-form-field">Amateur League</option>
                <option class="input-form-field">Pro League</option>
            </select>
            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>League Name</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="score in leagueOnly" :key="score.id">
                        <td>{{ score.game_date }}</td>
                        <td>{{ score.first_name }} {{ score.last_name }}</td>
                        <td>{{ score.total_score }}</td>
                        <td>{{ score.league_name }}</td>
                    </tr>
                </tbody>
            </table>


        </article>


    </section>
</template>

<script>
import getScoresWithData from '../composables/getScoresWithData'
import { ref} from 'vue'
import { computed } from 'vue'


export default {
    name: 'Scores',

    setup() {

        
        const selectLeague= ref('Local League')
        const { scores, error, load } = getScoresWithData()

        load()

        const sorted = computed(() => {
            return scores.value.sort((a, b) => parseInt(b.total_score) - parseInt(a.total_score)).slice(0, 10)
        })

        const leagueOnly = computed(() => {
            return scores.value.filter((score) => score.league_name == selectLeague.value).slice(0, 10)
        })
  





        return { scores, error, sorted, leagueOnly, selectLeague }
    }





}

</script>

<style scoped></style>