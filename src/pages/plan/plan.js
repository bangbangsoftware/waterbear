import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import template from './plan.html'
import user from '../../user.js'

import './task/task.js'
import './backlog/backlog.js'
import './sprint/sprint.js'
import './time/time.js'

const comp = {
   name: 'plan',
   beforeCreate,
   template,
   data: () => {
      return {
         session: store.state.session,
         menu: store.state.menu
      }
   },
   methods: {
      save: () => {
         const session = store.state.session
         user.updateUser(session.user, session.project)
      }
   }
}

Vue.component('plan', comp)
export default comp
