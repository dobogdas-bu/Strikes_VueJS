<template>
    <section>
        <div class="modal">
            <h2>Leagues</h2>

            <h3>Public Leagues</h3>
            <section>
                <VueMultiselect v-if="publicLeagues" v-model="selectedLeague" :options="publicLeagues"
                    :close-on-select="true" :clear-on-select="false" placeholder="Select or Search for League"
                    track-by="league_id" label="league_name" @select="() => buttonDisabled = false" />
                <table class="stats-table">
                    <tr>
                        <th>League Name</th>
                        <th>Skill Level</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                    </tr>
                    <tr v-for="league in displayed">
                        <td>{{ league.league_name }}</td>
                        <td>{{ league.skill_level_flag }}</td>
                        <td>{{ formatDate(league.start_date) }}</td>
                        <td>{{ formatDate(league.end_date) }}</td>
                        <td><button class="table-button">Join League</button></td>
                    </tr>

                </table>
            </section>
            <button @click="() => { return showRegister = !showRegister }">Create New League</button>
            <RegisterLeague v-if="showRegister" />
        </div>
    </section>
</template>

<script setup>
import RegisterLeague from './RegisterLeague.vue';
import { ref, watchEffect, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import getLeagues from '@/composables/getLeagues';
const showRegister = ref(false)
import VueMultiselect from 'vue-multiselect'
const { leagues, loadLeagues, errorLeagues } = getLeagues()
const selectedLeague = ref(null)
loadLeagues()

const publicLeagues = computed(() => {
    return leagues.value.filter((league) => {
        return league.access === 'O'
    })
})

const displayed = computed(() => {
    if (selectedLeague.value) {
        const filterString = selectedLeague.value.league_name.toString().toLowerCase()
        return publicLeagues.value.filter((league) => {
            const leagueString = league.league_name.toString().toLowerCase()
            return leagueString.includes(filterString)
        })
    } else {
        return leagues.value.filter((league) => {
            return league.access === 'O'
        })
    }
})

function formatDate(date) {
    if (!date) {
        return ''
    }
    let fDate = new Date(date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    return fDate
}




</script>

<style></style>