<template>
    <section>
        <div class="modal">
            <h2>Teams</h2>
            <div v-if="teams.teams === undefined" class="spinner"></div>

            <div v-if="teams.teams !== undefined && teams.teams.length">
                <select id="teamSelect" v-if="teams.teams.length > 1" v-model="teamSelect">
                    <option class="input-form-field" v-for="team in teams.teams" :key="team.team_id" :value="team.team_id">
                        {{
                            team.team_name }}
                    </option>
                </select>
                <h3 v-else>{{ teams.teams[0].team_name }}</h3>
                <div class="team-stats">
                    <section v-if="games.length">
                        <table  class="team">
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
                        <table class="team">
                            <tr>
                                <th></th>
                                <th>Contact</th>

                            </tr>
                            <tr v-for="player in teamPlayers">
                                <td>{{ player.first_name }} {{ player.last_name }}</td>
                                <td>{{ player.email }} / {{ player.phone_number }}</td>
                            </tr>

                        </table>
                    </section>
                    <p>toggle if team is public/private if Admin</p>
                </div>

            </div>
            
                <h3 v-if="teams.teams === undefined || !teams.teams.length">You currently aren't on any teams.</h3>




                <button>Join existing team</button>

                <button @click="()=> {return showRegister = true}">Create New Team</button>
                <button @click="()=> {return showInvite = true}">Invite Others</button>
                <div v-if="showRegister">
                    <RegisterTeam @registered="registered" />
                </div>
           

        </div>

    </section>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import getTeamWithData from '@/composables/getTeamWithData'
import RegisterTeam from './RegisterTeam.vue';
const teamSelect = ref(null)
const userStore = useUserStore()
const teams = ref([])
const allGames = ref([])
const allPlayers = ref([])
const showRegister = ref(false)
const showInvite = ref(false)

// add Roles by using if(role === admin)()=>{ Show Invite button, delete user, update team details info, etc }


function registered (){
    loadTeamData(userStore.stateUser.user_id)
    
}




const { teamData, errorTeam, loadTeamData } = getTeamWithData()

loadTeamData(userStore.stateUser.user_id)

watchEffect(() => {
    teams.value = teamData.value
    allGames.value = teamData.value.gamesPlayed    
    allPlayers.value = teamData.value.players
   
    if(teams.value.teams && teams.value.teams.length > 0){
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







</script>

<style scoped></style>