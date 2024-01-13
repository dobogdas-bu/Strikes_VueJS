<template>

    <section>

        <h2>Teams</h2>
        <div v-if="teams.teams === undefined" class="spinner"></div>
        <Banner v-if="submitted" @closeBanner="() => {
            submitted = false
            error = null
        }">
            <p>Successfully joined team.</p>
        </Banner>
        <Banner v-if="userTeamError" :error="userTeamError" @closeBanner="() => {
            submitted = false
            userTeamError = null
        }" />
        <div v-if="teams.teams !== undefined && teams.teams.length">
            <select id="teamSelect" v-if="teams.teams.length > 1" v-model="teamSelect">
                <option class="option" v-for="team in teams.teams" :key="team.team_id" :value="team.team_id">
                    {{
                        team.team_name }}
                </option>
            </select>
            <h3 v-else>{{ teams.teams[0].team_name }}</h3>
            <div class="team-stats">
                <section v-if="games.length">
                    <table class="stats-table">
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Team Score</th>
                            <th>
                                Alley</th>
                        </tr>
                        <tr v-for="game in games" :key="game.game_id">
                            <td>{{ game.Date }}</td>
                            <td>{{ game.Team_total_score }}</td>
                            <td>{{ game.alley_name }}</td>
                        </tr>
                    </table>
                </section>
                <section>
                    <table class="stats-table">
                        <tr>

                            <th colspan="2">Players</th>

                        </tr>
                        <tr v-for="player in teamPlayers">
                            <td>{{ player.first_name }} {{ player.last_name }}</td>
                            <td>{{ player.email }} / {{ player.phone_number }}</td>
                        </tr>

                    </table>
                </section>
                <div>
                    <button @click="() => {
                        showRegister = false
                        showJoin = false
                        showInvite = !showInvite
                    }">Invite Others</button>

                    <!-- send invite section -->
                    <div v-if="showInvite">
                        <label for="email" class="input-form-field">An email invite will be sent to join team {{
                            teamSelect.selected }}:</label><input id="email" type="email" v-model="email">
                        <button :disabled="emailButtonDisabled">Send Invite</button>
                    </div>
                </div>
            </div>

        </div>

        <h3 v-if="teams.teams === undefined || !teams.teams.length">You currently aren't on any teams.</h3>



        <div class="flex">
            <button @click="loadTeamSelect">Join existing team</button>
            <button @click="() => {
                showJoin = false
                return showRegister = !showRegister
            }">Create New Team</button>

        </div>


        <!-- join team section -->
        <div v-if="showJoin">
            <h3>Select Team to Join</h3>

            <VueMultiselect v-if="allTeams" v-model="selectedTeam" :options="allTeams" :close-on-select="true" :clear-on-select="false"
            placeholder="Select or Search for a Team" track-by="team_id" label="team_name" @select="()=> buttonDisabled= false" />
            <button :disabled="buttonDisabled" @click="joinTeam">Join</button>

        </div>
        <div v-if="showRegister">
            <RegisterTeam @registered="registered" />
        </div>



    </section>

</template>

<script setup>

import { ref, watchEffect, computed, onMounted, VueElement } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import VueMultiselect from 'vue-multiselect'
import getTeamWithData from '@/composables/getTeamWithData'
import getTeams from '@/composables/getTeams'
import RegisterTeam from './RegisterTeam.vue';
import addUsertoTeam from '@/composables/addUsertoTeam';
import Banner from './Banner.vue';
const teamSelect = ref(null)
const userStore = useUserStore()
const teams = ref([])
const allGames = ref([])
const allPlayers = ref([])
const showRegister = ref(false)
const showInvite = ref(false)
const showJoin = ref(false)

const buttonDisabled = ref(true)
const submitted = ref(null)
const selectedTeam = ref(null)
const email = ref('')

// add Roles by using if(role === admin)()=>{ Show Invite button, delete user, update team details info, etc }


function registered() {
    loadTeamData(userStore.stateUser.user_id)
}




const { teamData, errorTeam, loadTeamData } = getTeamWithData()

const { allTeams, errorTeams, loadTeams } = getTeams()

const { userTeamRes, userTeamError, loadAddUsertoTeam } = addUsertoTeam()

loadTeamData(userStore.stateUser.user_id)

watchEffect(() => {
    teams.value = teamData.value
    allGames.value = teamData.value.gamesPlayed
    allPlayers.value = teamData.value.players

    if (teams.value.teams && teams.value.teams.length > 0) {
        teamSelect.value = teams.value.teams[teams.value.teams.length - 1].team_id
    }
})




const games = computed(() => {
    return allGames.value.filter((game) => {

        return game.team_id === teamSelect.value
    })
})

const teamPlayers = computed(() => {
    return allPlayers.value.filter((player) => {


        return player.team_id === teamSelect.value
    }

    )
})

const emailButtonDisabled = computed(() => {
    return email.value.trim() === '';
})


function loadTeamSelect() {
    loadTeams('public')
    showInvite.value = false
    showRegister.value = false
    return showJoin.value = !showJoin.value
}

async function joinTeam() {
    const ut = {
        user_id: userStore.stateUser.user_id,
        team_id: selectedTeam.value.team_id
    }
    await loadAddUsertoTeam(ut)
    if (userTeamRes.value) {
        loadTeamData(userStore.stateUser.user_id)
        showJoin.value = false
        selectedTeam.value = ''
        submitted.value = true
    }
}







</script>

<style src="vue-multiselect/dist/vue-multiselect.css">




</style>