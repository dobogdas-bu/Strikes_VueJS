import {ref} from 'vue'

const getReservations =()=>{

const reservations = ref([])

const errorReservations = ref(null)

const loadReservations = async()=> {

const url = process.env.VUE_APP_BASEURL+'reservations'
    try {
        const res = await fetch(url)
        if(!res.ok){
            error.value ='Data does not exist'
        }
        reservations.value = await res.json()
        // scores.value.sort((a,b)=> parseInt(b.score)-parseInt(a.score))
    } catch(err){
        errorReservations.value = err.message
        console.log(errorReservations.value)
    }

}


return {reservations, errorReservations, loadReservations}

}

export default getReservations