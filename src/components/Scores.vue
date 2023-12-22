<template>
    <section>
        <slot></slot>

        <div v-if="!scores.length" class="spinner"></div>

        <table v-else class="stats-table">

            <th v-if="filter === 'league'" colspan="3">
                <select v-model="selectLeague" id="selectLeague" class="input-form-field" required>
                    <option disabled class="input-form-field">Select a League</option>
                    <option selected class="input-form-field">Local League</option>
                    <option class="input-form-field">Amateur League</option>
                    <option class="input-form-field">Pro League</option>
                </select>
            </th>

            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th v-if="extraColumn.show">{{ extraColumn.header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="score in sorted" :key="score.id">
                    <td>{{ score.game_date }}</td>
                    <router-link class="table-link" :to="{ name: 'UserDetails', params: { id: score.user_id } }">
                        <td>{{ score.first_name }} {{ score.last_name }}</td>
                    </router-link>
                    <td>{{ score.total_score }}</td>
                    <td v-if="extraColumn.show">{{ score.alley_name }}</td>

                </tr>

            </tbody>
        </table>



    </section>
</template>

<script setup>
import getScoresWithData from '../composables/getScoresWithData'
import { ref, defineEmits } from 'vue'
import { computed } from 'vue'
import { useUserStore } from '@/stores/UserStore';

const emit = defineEmits(['noScores'])


// filter value selects the sorted value below
const { filter } = defineProps(['filter'])
const userStore = useUserStore()
const selectLeague = ref('Local League')

const { scores, error, load } = getScoresWithData()
const extraColumn = ref()
extraColumn.value = {
    show: false,
    header: 'Alley'
}


load()

const sorted = computed(() => {
    switch (filter) {
        case 'single':
            // code block to show users top score
            const userScores = scores.value.filter((score) => {
                return score.user_id.toString().toLowerCase().includes(userStore.stateUser.user_id)

            })
            if (userScores.length) {
                let totalScore = 0
                let count = 0;
                userScores.forEach(score => {
                    
                    count++
                    // totalScore += score.total_score
                    
                    totalScore += parseInt(score.total_score)
                    
                    

                });
                const average = totalScore / count
                userStore.setStats({
                    "gamesLogged": count,
                    "totalScore": totalScore,
                    "average": average
                })
                return userScores
            } else emit('noScores')

            break;
        case 'league':
            // provide dropdown to select league if player is in multiple leagues
            return scores.value.filter((score) => score.league_name == selectLeague.value).slice(0, 10)
            break;
        case 'all':
            // provide dropdown to select league if player is in multiple leagues
            return scores.value.sort((a, b) => parseInt(b.total_score) - parseInt(a.total_score)).slice(0, 10)
            break;
        default:
        // code block

    }

})



</script>

<style scoped></style>