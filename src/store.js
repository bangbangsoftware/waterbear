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
      },
      session: {
         error: ''
      }
   },
   mutations: {
      stage: (state, newStage) => {
         state.signup.stages.push(newStage)
      },
      member: (state, newMember) => {
         state.members.push(newMember)
      },
      db: (state, database) => {
         state.db = database
      },
      error: (state, error) => {
         console.log('session now has this error:' + error)
         state.session.error = error
      },
      project: (state, project) => {
         state.session.project = project
      },
      user: (state, user) => {
         state.session.user = user
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
