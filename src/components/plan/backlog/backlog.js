import Vue from 'vue'

import store from '../../../store.js'
import beforeCreate from '../../../loginCheck.js'

import template from './backlog.html'
import user from '../../../user.js'

const comp = {
   name: 'backlog',
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

Vue.component('backlog', comp)
export default comp
