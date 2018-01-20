import Vue from 'vue'

import store from '../../store.js'
import loginCheck from '../../loginCheck.js'
import util from './util.js'

import template from './plan.html'

import task from './task/task.js'
import backlog from './backlog/backlog.js'
import selectSprint from './select/select.js'
import sprintBacklog from './select/backlog.js'
import sprintCreate from './select/create.js'
import teamDisplay from './team/team.js'

console.log(' CURRENTLY THIS IS NOT USED?!')

const comp = {
   components: {
      task,
      backlog,
      selectSprint,
      sprintBacklog,
      sprintCreate,
      teamDisplay
   },
   name: 'plan',
   beforeCreate: () => {
      console.log(new Date() + ' Plan created')
      loginCheck().then(() => {
         const state = util.next(store.state.session)
         console.log('Where we at? ' + state)
         store.commit('planState', state)
      })
   },
   template,
   data: () => {
      return {
         session: store.state.session
      }
   },
   watch: {
      session: function(val) {
         this.session = val
      }
   },
   methods: {}
}

Vue.component('plan', comp)

export default comp
