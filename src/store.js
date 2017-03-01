import Vuex from 'vuex'
import Vue from 'vue'
import defaults from './defaults.js'

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
      },
      defaults
   },
   mutations: {
      stage: (state, newStage) => {
         state.signup.stages.push(newStage)
      },
      member: (state, newMember) => {
         state.members.push(newMember)
         store.state.db.get(state.session.project._id)
            .then(prj => {
               prj.members = state.members
               return store.state.db.put(prj)
            }).then(proj => {
               console.log('Member added to db -  ' + state.session.project._id)
               proj._id = state.session.project._id
               state.session.project = proj
            })
      },
      owner: (state, owner) => {
         store.state.db.get(state.session.project._id)
            .then(prj => {
               prj.owner = owner
               return store.state.db.put(prj)
            }).then(proj => {
               console.log('Member owner to db -  ' + state.session.project._id)
               proj._id = state.session.project._id
               state.session.project = proj
            })
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
