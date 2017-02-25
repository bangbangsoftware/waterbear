import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      feeds: [],
      db: null,
      members: [],
      signup: {
         stages: []
      }
   },
   mutations: {
      stage: (state, newStage) => {
         console.log('STORE - signupchanged to ')
         console.log(newStage)
         state.signup.stages.push(newStage)
      },
      member: (state, newMember) => {
         state.members.push(newMember)
      },
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
