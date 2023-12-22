import { ref} from 'vue'




const registerUser = () =>{

const userId = ref('')
const error = ref(null)


const load = async (userData) =>{

    const url = process.env.VUE_APP_BASEURL+'register'
try {
        const res = await fetch(url , {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
        })
        if(!res.ok){
            if(res.status ===409)
            error.value = 'Email has already been registered. Please try again.'
            console.log(error.value)
        }
        userId.value = await res.json()
    
        
} catch (error) {
    
     
}
}
return { userId, error, load}  





}
export default registerUser