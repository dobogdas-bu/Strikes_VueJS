import {ref} from 'vue'

const getAlleys =()=>{

const alleys = ref([])

const errorAlleys = ref(null)

const loadAlleys = async()=> {

const url = 'https://strikes-api.onrender.com/alleys'
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        alleys.value = await res.json()
        
    } catch(err){
        errorAlleys.value = err.message
        console.log(errorAlleys.value)
    }

}


return {alleys, errorAlleys, loadAlleys}

}

export default getAlleys