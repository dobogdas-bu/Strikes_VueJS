import {ref} from 'vue'

const getLeagues =()=>{

const leagues = ref([])

const errorLeagues = ref(null)

const loadLeagues = async()=> {

const url = process.env.VUE_APP_BASEURL+'leagues'
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        leagues.value = await res.json()
        
    } catch(err){
        errorLeagues.value = err.message
        console.log(errorLeagues.value)
    }

}


return {leagues, errorLeagues, loadLeagues}

}

export default getLeagues