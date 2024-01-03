import { ref} from 'vue'
const baseUrl=process.env.VUE_APP_BASEURL




const registerTeam = () =>{

const response = ref('')
const error = ref(null)


const loadRegisterTeam = async (team) =>{

    const url = baseUrl+'teams'
try {
        const res = await fetch(url , {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(team)
        })
        if(!res.ok){
            error.value ='Error processing request.'
        }
        response.value = await res.json()
    
        
} catch (error) {
    error.value = error.message
     
}
}
return { response, error, loadRegisterTeam}  





}
export default registerTeam