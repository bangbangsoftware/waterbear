import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import template from './member.html'
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
         session: store.state.session
      }
   },
   methods: {
      save: () => {
         store.commit('updateMember', store.state.session.user)
      }
   }
}

Vue.component('member', comp)
export default comp
