import Vue from 'vue'

import store from '../../../store.js'
import user from '../../../user.js'

import template from './time.html'

const comp = {
   name: 'time',
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

Vue.component('time', comp)
export default comp
