import {ref} from 'vue'

const baseUrl=process.env.VUE_APP_BASEURL


const getScoresWithData =()=>{

const scores = ref([])

const error = ref(null)

const load = async()=> {
    
    const url = baseUrl+'scores'
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        
        scores.value = await res.json()
        // scores.value.sort((a,b)=> parseInt(b.score)-parseInt(a.score))
    } catch(err){
        error.value = err.message
        console.log(error.value)
    }

}


return {scores, error, load}

}

export default getScoresWithData
