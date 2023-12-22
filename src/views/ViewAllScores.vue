<template>
    <section>
        <div v-if="!scores.length" class="spinner"></div>
        <article id="allScores" v-else>            
            <div v-if="error">{{ error }}</div>
            <div v-if="scores.length"></div>


            <table class="stats-table">
                <thead>

                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Allley</th>
                        <th>League (if applicable)</th>
                    </tr>
                    <tr>
                        <th>
                            <div class="filter-div"><input v-model="dateFilter" class="filter" type="text"
                                    placeholder="Filter"><button class="filterBtn"><span class="material-symbols-outlined">
                                        search
                                    </span></button></div>
                        </th>
                        <th>
                            <div class="filter-div"><input v-model="nameFilter" class="filter" type="text" placeholder="Filter"><button
                                    class="filterBtn"><span class="material-symbols-outlined">
                                        search
                                    </span></button></div>
                        </th>
                        <th>
                            <div class="filter-div"><input v-model="scoreFilter" class="filter" type="text"
                                    placeholder="Filter"><button class="filterBtn"><span class="material-symbols-outlined">
                                        search
                                    </span></button></div>
                        </th>
                        <th>
                            <div class="filter-div"><input v-model="alleyFilter" class="filter" type="text" placeholder="Filter"><button
                                    class="filterBtn"><span class="material-symbols-outlined">
                                        search
                                    </span></button></div>
                        </th>
                        <th>
                            <div class="filter-div"><input v-model="leagueFilter" class="filter" type="text" placeholder="Filter"><button
                                    class="filterBtn"><span class="material-symbols-outlined">
                                        search
                                    </span></button></div>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="score in sorted" :key="score.id">
                        <td>{{ score.game_date }}</td>
                        <td>{{ score.first_name }} {{ score.last_name }}</td>
                        <td>{{ score.total_score }}</td>
                        <td>{{ score.alley_name }}</td>
                        <td>{{ score.league_name }}</td>
                    </tr>
                </tbody>
            </table>



        </article>


    </section>
</template>
    
<script>
import getScoresWithData from '../composables/getScoresWithData'
import { computed } from 'vue'
import { ref } from 'vue'


export default {

    name: 'ViewAllScores',
    setup() {
        const { scores, error, load } = getScoresWithData()
        const dateFilter = ref('')
        const scoreFilter = ref('')
        const nameFilter = ref('')
        const alleyFilter = ref('')
        const leagueFilter = ref('')
        
        load()

        const sorted = computed(() => {
            if (scoreFilter.value) {
                const filterString = scoreFilter.value.toString().toLowerCase()

                return scores.value.filter((score) => {
                    const scoreString = score.total_score.toString().toLowerCase()
                    return scoreString.includes(filterString)
                })
            }if (dateFilter.value) {
                const filterString = dateFilter.value.toString().toLowerCase()

                return scores.value.filter((score) => {
                    const dateString = score.game_date.toString().toLowerCase()
                    return dateString.includes(filterString)
                })
            } if (nameFilter.value) {
                const filterString = nameFilter.value.toString().toLowerCase()

                return scores.value.filter((score) => {
                    const nameString = (score.first_name +' '+ score.last_name).toLowerCase()
                    return nameString.includes(filterString)
                })
            }if (scoreFilter.value) {
                const filterString = scoreFilter.value.toString().toLowerCase()
                return scores.value.filter((score) => {
                    const scoreString = score.total_score.toString().toLowerCase()
                    return scoreString.includes(filterString)
                })
            }if (alleyFilter.value) {
                const filterString = alleyFilter.value.toString().toLowerCase()
                return scores.value.filter((score) => {
                    const alleyString = score.alley_name.toString().toLowerCase()
                    return alleyString.includes(filterString)
                })
            }if (leagueFilter.value) {
                const filterString = leagueFilter.value.toString().toLowerCase()
                return scores.value.filter((score) => {
                    if(score.league_name){
                    const leagueString = score.league_name.toString().toLowerCase()
                    return leagueString.includes(filterString)
                    }
                })
            }else {

                return scores.value.sort((a, b) => parseInt(b.total_score) - parseInt(a.total_score))
            }
        })







        return { scores, error, load, sorted, dateFilter, scoreFilter, nameFilter,alleyFilter, leagueFilter }
    }





}

</script>
    
<style scoped></style>