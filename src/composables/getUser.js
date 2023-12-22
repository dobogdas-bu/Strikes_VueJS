import {ref} from 'vue'

const getUser =()=>{

const user = ref([])

const errorUser = ref(null)

const loadUser = async(id)=> {

const url = process.env.VUE_APP_BASEURL+'users/'+id
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        user.value = await res.json()
        
    } catch(err){
        errorUser.value = err.message
        console.log(errorUser.value)
    }

}


return {user, errorUser, loadUser}

}

export default getUser