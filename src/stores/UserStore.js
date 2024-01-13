import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
    // Define state as a function returning the state object
    state: () => ({
        stateToken: '',
        stateUser: '',
        stats: null,
    }),

    // Define actions
    actions: {
        setUser(authed) {
            const { accessToken, user } = authed;
            this.stateUser = user;
            this.stateToken = accessToken;
        },
        setStats(stats){
            
            // const {gamesLogged, totalScore, average } = stats
            this.stats = stats
        }
    },

    // Persist configuration
    persist: {
        enabled: true, // Enable persistence
        storage: sessionStorage, // Use sessionStorage
    },
});

