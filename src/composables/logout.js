import { ref } from 'vue'
const baseUrl = process.env.VUE_APP_BASEURL




const logout = () => {

    // const gameId = ref('')
    const errorLogout = ref(null)
    const res = ref('')

    const loadLogout = async () => {

        const url = baseUrl + 'logout'
        try {
            const res = await fetch(url,{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            if (!res.ok) {
                error.value = 'Data does not exist'
            }
            res.value = await res.json()
            
            
        

        } catch (error) {
            errorLogout.value = error.message

        }
    }
    return { res, errorLogout, loadLogout }





}
export default logout