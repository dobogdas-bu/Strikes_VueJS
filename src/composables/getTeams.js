import {ref} from 'vue'

const getTeams =()=>{

const allTeams = ref([])

const errorTeams = ref(null)

const loadTeams = async(access)=> {
    const url = process.env.VUE_APP_BASEURL+'teams?access='+access

    try {
        const res = await fetch(url)
        if(!res.ok){
            errorTeams.value ='Error loading teams'
        }
        allTeams.value = await res.json()
        
    } catch(err){
        errorTeams.value = err.message
        
    }

}


return {allTeams, errorTeams, loadTeams}

}

export default getTeams
