import { ref } from 'vue'




const registerAlley = (alleyData) => {

    const alleyId = ref('')

    const error = ref(null)


    const load = async (alleyData) => {

        const url = process.env.VUE_APP_BASEURL+'alleys'
        try {
            const res = await fetch(url, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alleyData)
            })
            if (!res.ok) {
                error.value ='Error processing request.'
            }
            alleyId.value = await res.json()


        }


        catch (error) {
            error.value = error.message
            
        }
    }
    return { alleyId, error, load }





}
export default registerAlley