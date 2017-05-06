import Vue from 'vue'

import store from '../../store.js'
import loginCheck from '../../loginCheck.js'

import template from './plan.html'

import './task/task.js'
import './backlog/backlog.js'
import './sprint/sprint.js'
import './sprintBacklog/sprintBacklog.js'
import './team/team.js'

const comp = {
   name: 'plan',
   beforeCreate: () => {
      console.log(new Date() + ' Plan created')
      loginCheck()
      store.commit('planStore', 'selectSprint')
   },
   template,
   data: () => {
      return {
         session: store.state.session
      }
   },
   methods: {
      deselect: () => {
         store.commit('selectSprint', -1)
         store.commit('planState', 'sprintSelect')
      }
   }
}

Vue.component('plan', comp)
export default comp
