import {ref} from 'vue'

const getTeamWithData = ()=>{

const teamData = ref([])

const errorTeam = ref(null)

const loadTeamData = async(userId)=> {

const url = process.env.VUE_APP_BASEURL+'teams/'+userId
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Error processing request'
        }
        teamData.value = await res.json()
        
    } catch(err){
        
        
    }

}


return {teamData, errorTeam, loadTeamData}

}

export default getTeamWithData