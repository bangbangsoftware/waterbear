import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import template from './member.html'
import user from '../../user.js'
import './member.css'

import './name/name.js'
import './hours/hours.js'
import './skills/skills.js'

const comp = {
   name: 'member',
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

Vue.component('member', comp)
export default comp
