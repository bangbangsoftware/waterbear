import Vue from 'vue'

import template from './sprint.html'

import store from '../../../store.js'
import user from '../../../user.js'

const comp = {
   name: 'sprint',
   template,
   data: () => {
      return {
         project: store.state.session.project
      }
   },
   methods: {
      save: () => {
         const session = store.state.session
         user.updateUser(session.user, session.project)
      },
      selectSprint: (i) => {
         console.log('sprint selected is number ' + i)
         store.commit('selectSprint', i)
      },
      selectTask: (i, task) => {
         console.log('task, sprint selected is number ' + i)
         store.commit('selectSprint', i)
         store.commit('selectTask', task)
      }
   }
}

Vue.component('sprint', comp)
export default comp
