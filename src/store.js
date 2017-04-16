import Vuex from 'vuex'
import Vue from 'vue'
import defaults from './defaults.js'

import validStory from './components/story/valid.js'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      menu: false,
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
            stories: [],
            members: [],
            defaults: [],
            owner: {}
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
      db: (state, database) => {
         state.db = database
      },
      addMember: (state, member) => {
         state.members.push(member)
      },
      storyError: (state, message) => {
         state.story.error = message
         state.story.valid = false
      },
      storyOk: (state) => {
         state.story.error = ''
         state.story.valid = true
      },
      clearStory: (state) => {
         state.story = {
            title: '',
            desc: '',
            tags: [],
            colourNo: 4,
            acs: [],
            valid: false
         }
      },
      postStory: (state) => {
         if (!state.session.project.stories) {
            state.session.project.stories = []
         }
         state.session.project.stories.push(state.story)
         store.commit('log', 'Added "' + state.story.title + '" story')
         store.commit('clearStory')
      },
      story: (state, story) => {
         state.store = story
      },
      title: (state, t) => {
         state.story['title'] = t
         validStory(state.story)
      },
      desc: (state, desc) => {
         state.story.desc = desc
         validStory(state.story)
      },
      removeAcceptance: (state, index) => {
         state.story.acs.splice(index, 1)
         validStory(state.story)
      },
      acceptance: (state, crit) => {
         state.story.acs.push(crit)
         validStory(state.story)
      },
      colour: (state, no) => {
         state.story.colourNo = no
      },
      error: (state, error) => {
         console.log('session now has this error:' + error)
         state.session.error = error
      },
      nick: (state, name) => {
         state.session.user.nick = name
      },
      project: (state, prj) => {
         state.session.project = prj
      },
      user: (state, user) => {
         state.session.user = user
      },
      toggleNight: (state, time) => {
         const now = state.session.user.days[time.day].night[time.hour].on
         state.session.user.days[time.day].night[time.hour].on = !now
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
      },
      menuOn: (state) => {
         state.menu = true
      },
      menuOff: (state) => {
         state.menu = false
      }
   }
})

export default store
