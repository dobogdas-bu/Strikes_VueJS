<template>
    <section>
                <article id="allScores">
                    <h2>Top Scores</h2>
                    <div v-if="error">{{ error }}</div>
                    <div v-if="scores.length"></div>
                    
                    <h3>All Time</h3>
                    <table class="stats-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>League (if applicable)</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="score in sorted" :key="score.id">
                                <td>{{score.game_date}}</td>
                                <td>{{score.first_name}} {{ score.last_name }}</td>
                                <td>{{score.total_score}}</td>
                                <td>{{score.league_name }}</td>
                            </tr>                       
                        </tbody>
                    </table>
                    
    
                    
                </article>
    
    
            </section>
    </template>
    
    <script>
    import getScoresWithData from '../composables/getScoresWithData'
    import { computed } from 'vue'
    
    
    export default{
    
    
    setup(){
        const {scores, error, load} = getScoresWithData()
    
        load()
        
        const sorted = computed(()=>{
        return scores.value.sort((a,b)=> parseInt(b.total_score)-parseInt(a.total_score))
    })
        
      
    
       
    
        return {scores, error,load, sorted}
        }
        
        
    
        
    
    }
    
    </script>
    
    <style scoped>
    
    </style>