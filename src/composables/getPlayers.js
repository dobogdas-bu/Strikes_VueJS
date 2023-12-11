import {ref} from 'vue'

const getPlayers =()=>{

const players = ref([])

const errorPlayers = ref(null)

const loadPlayers = async()=> {
    const url = 'https://strikes-api.onrender.com/users'

    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        players.value = await res.json()
        // scores.value.sort((a,b)=> parseInt(b.score)-parseInt(a.score))
    } catch(err){
        errorPlayers.value = err.message
        console.log(errorPlayers.value)
    }

}


return {players, errorPlayers, loadPlayers}

}

export default getPlayers
