import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import template from './member.html'
import './member.css'

import './hours/hours.js'
import './skills/skills.js'
import './name/name.js'

const comp = {
   name: 'member',
   beforeCreate,
   template,
   data: () => {
      return {
         session: store.state.session
      }
   }
}

Vue.component('member', comp)
export default comp
