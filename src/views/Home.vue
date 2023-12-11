<template>
    
    <About />
    <Scores :key="compKey" />
    <LogScore @updateScores="forceRender" />
    <Locator />
    
</template>

<script>
import About from '../views/About.vue'

import Scores from '../components/Scores.vue'
import Locator from '../components/Locator.vue'
import LogScore from '../components/LogScore.vue'
import { ref } from 'vue'




export default {
    name: 'Home',
    components: {
        About, Scores, Locator, LogScore
    },
    setup() {
        const compKey = ref(0)
        function forceRender() {
            console.log('updatingscores')
            compKey.value += 1
        }
        return {compKey, forceRender}
    }

}



</script>

<style>


</style>