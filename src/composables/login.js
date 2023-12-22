import { ref } from 'vue'
const baseUrl = process.env.VUE_APP_BASEURL


    const errorLogin = ref(null)
    const user = ref('')

const login = () => {



    const loadLogin = async (unAuthed) => {

        const url = baseUrl + 'auth'
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(unAuthed)
            })
            
            if(res.ok){
            user.value = await res.json()
            } else {
                if(res.status === 401){
                    return errorLogin.value = 'Invalid email or password.'
                }
                errorLogin.value = res.status
            }
        } catch (error) {
            
        }
    }
    return { user, errorLogin, loadLogin }

}
export default login