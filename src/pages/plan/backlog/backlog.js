import Vue from 'vue'

import template from './backlog.html'

import store from '../../../store.js'
import user from '../../../user.js'

const comp = {
   name: 'backlog',
   template,
   data: () => {
      return {
         project: store.state.session.project,
         colourClasses: store.state.defaults.colourClasses
      }
   },
   methods: {
      save: () => {
         const session = store.state.session
         user.updateUser(session.user, session.project)
      },
      selectStory: (i) => {
         console.log('story selected is number ' + i)
         store.commit('selectStory', i)
      }
   }
}

Vue.component('backlog', comp)
export default comp
