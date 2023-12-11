import { ref} from 'vue'




const registerUser = () =>{

const userId = ref('')
const error = ref(null)


const load = async (userData) =>{

    const url = 'https://strikes-api.onrender.com/users'
try {
        const res = await fetch(url , {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
        })
        if(!res.ok){
            error.value ='Data does not exist'
        }
        userId.value = await res.json()
    
        
} catch (error) {
    error.value = error.message
     
}
}
return { userId, error, load}  





}
export default registerUser