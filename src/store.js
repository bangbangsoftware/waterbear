import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      feeds: [],
      db: null
   },
   mutations: {
      db: (state, database) => {
         state.db = database
      },
      log: (state, message) => {
         const item = {
            date: new Date(),
            message
         }
         state.feeds.push(item)
      }
   }
})

export default store
