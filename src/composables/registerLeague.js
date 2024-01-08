import { ref} from 'vue'
const baseUrl=process.env.VUE_APP_BASEURL




const registerLeague = () =>{

const response = ref('')
const error = ref(null)


const loadRegisterLeague = async (league) =>{

    const url = baseUrl+'leagues'
try {
        const res = await fetch(url , {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(league)
        })
        if(!res.ok){
            error.value ='Error adding league.'
        }
        response.value = res.status
    
        
} catch (error) {
    error.value = error.message
     
}
}
return { response, error, loadRegisterLeague}  





}
export default registerLeague