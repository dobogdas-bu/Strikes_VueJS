import { ref} from 'vue'


const response = ref(null)

const updateUser = () =>{


const error = ref(null)


const load = async (userData) =>{

    const url = process.env.VUE_APP_BASEURL+'users/'+userData.user_id
try {
        const res = await fetch(url , {


        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
        })
        if(!res.ok){
            return error.value ='Unable to update user'
        }
        response.value = res.json()
        console.log(response.value)
        
    
        
} catch (error) {
    error.value = error.message
     
}
}
return { response, error, load}  


}
export default updateUser