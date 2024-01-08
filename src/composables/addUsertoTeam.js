import { ref} from 'vue'
const baseUrl=process.env.VUE_APP_BASEURL




const addUsertoTeam = () =>{

const userTeamRes = ref('')
const userTeamError = ref(null)


const loadAddUsertoTeam = async (ut) =>{

    const url = baseUrl+'teams/addUser'
try {
        const res = await fetch(url , {


        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(ut)
        })
        if(!res.ok){
            userTeamError.value =await res.json()
        }
        userTeamRes.value = await res.json()
    
        
} catch (error) {
    userTeamError.value = error.message
     
}
}
return { userTeamRes, userTeamError, loadAddUsertoTeam}  





}
export default addUsertoTeam