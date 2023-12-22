import { defineStore } from 'pinia';

export const useSessionStore = defineStore({
  id: 'SessionStore', // The unique ID of the store
  state: () => ({
    showLanding: true,
  }),
  actions: {
    setLanding(landing) {
      this.showLanding = landing;
    },
  },getters: {
    getShowLanding: (state) => {
      return state.showLanding;
    }
},
persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})

