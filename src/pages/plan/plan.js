import Vue from 'vue'

import store from '../../store.js'
import loginCheck from '../../loginCheck.js'
import next from './next.js'

import template from './plan.html'

import './task/task.js'
import './backlog/backlog.js'
import './sprint/sprint.js'
import './sprint/backlog.js'
import './sprint/create.js'
import './team/team.js'

const comp = {
   name: 'plan',
   beforeCreate: () => {
      console.log(new Date() + ' Plan created')
      loginCheck().then(() => {
         const state = next(store.state.session)
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
   methods: {}
}

Vue.component('plan', comp)
export default comp
