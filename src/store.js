import Vuex from 'vuex'
import Vue from 'vue'
import defaults from './defaults.js'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      feeds: [],
      db: null,
      members: [],
      story: {
         title: '',
         desc: '',
         tags: [],
         colourNo: 6,
         acs: [],
         valid: false
      },
      signup: {
         stages: []
      },
      session: {
         error: '',
         project: {
            stories: []
         },
         user: {
            days: []
         },
         couchURL: 'http://localhost:5984/'
      },
      defaults
   },
   methods: {},
   mutations: {
      stage: (state, newStage) => {
         state.signup.stages.push(newStage)
      },
      newMember: (state, newMember) => {
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
      updateMember: (state, newMember) => {
         store.state.db.get(state.session.project._id)
            .then(prj => {
               const memberList = prj.members
                  .filter(member => member.email !== newMember.email)
               memberList.push(newMember)
               prj.members = memberList
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
               prj.defaults = state.defaults
               return store.state.db.put(prj)
            }).then(proj => {
               console.log('Member owner to db -  ' + state.session.project._id)
               console.log('And added defaults')
               proj._id = state.session.project._id
               state.session.project = proj
            })
      },
      db: (state, database) => {
         state.db = database
      },
      validStory: (state) => {
         state.story.valid = false
         if (state.story.title.length === 0) {
            state.story.error = 'invalid story - missing title'
            return false
         }

         if (state.story.desc.length === 0) {
            state.story.error = 'invalid story - missing description'
            return false
         }

         if (state.story.acs.length === 0) {
            state.story.error = 'invalid story - missing acceptance critera'
            return false
         }
         state.story.valid = true
         state.story.error = ''
         return true
      },
      postStory: (state) => {
         state.session.project.stories.push(state.story)
         store.commit('log', 'Added "' + state.story.title + '" story')
         state.story = {
            title: '',
            desc: '',
            tags: [],
            colourNo: 4,
            acs: [],
            valid: false
         }
      },
      title: (state, title) => {
         state.story.title = title
         store.commit('validStory')
      },
      desc: (state, desc) => {
         state.story.desc = desc
         store.commit('validStory')
      },
      removeAcceptance: (state, index) => {
         state.story.acs.splice(index, 1)
         store.commit('validStory')
      },
      acceptance: (state, crit) => {
         state.story.acs.push(crit)
         store.commit('validStory')
      },
      colour: (state, no) => {
         state.story.colourNo = no
      },
      error: (state, error) => {
         console.log('session now has this error:' + error)
         state.session.error = error
      },
      nick: (state, name) => {
         state.session.user.name = name
      },
      project: (state, project) => {
         state.session.project = project
      },
      signupUser: (state, user) => {
         state.session.user = user
      },
      user: (state, user) => {
         state.session.user = user
            // @TODO setup user in project
         const owner = state.session.project.owner
         if (owner.email === 'undefined' || owner.email === user.name) {
            store.commit('owner', user)
         } else {
            store.commit('updateMember', user)
         }
      },
      toggleNight: (state, time) => {
         state.session.user.days[time.day].night[time.hour].on = !state.session.user.days[time.day].night[time.hour].on
      },
      toggleDay: (state, time) => {
         const hour = state.session.user.days[time.day].day[time.hour]
         hour.on = !hour.on
         state.session.user.days[time.day].day[time.hour] = hour
         state.session.change = time
         return hour
      },
      day: (state, hours) => {
         if (!state.session.user.days) {
            state.session.user.days = []
         }
         state.session.user.days.push(hours)
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
