import { ref} from 'vue'




const addScore = () =>{

const scoreId = ref('')
const error = ref(null)


const load = async (scoreData) =>{

    const url = 'https://strikes-api.onrender.com/scores'
try {
        const res = await fetch(url, {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(scoreData)
        })
        if(!res.ok){
            error.value ='Data does not exist'
            return
        }
        scoreId.value = await res.json()
    
        
} catch (error) {
    error.value = error.message
    console.log(error.value)    
}
}
return { scoreId, error, load}  





}
export default addScore