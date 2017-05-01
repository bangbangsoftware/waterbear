import Vue from 'vue'

import store from '../../store.js'
import loginCheck from '../../loginCheck.js'

import template from './plan.html'
import user from '../../user.js'

import './task/task.js'
import './backlog/backlog.js'
import './sprint/sprint.js'
import './team/team.js'

const comp = {
   name: 'plan',
   beforeCreate: () => {
      console.log(new Date() + ' Plan created')
      loginCheck()
   },
   template,
   data: () => {
      return {
         session: store.state.session
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
