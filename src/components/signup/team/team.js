import template from './team.html'
import store from '../../../store.js'
import Vue from 'vue'
import defaults from '../../../defaults.js'

const comp = {
   name: 'team',
   template,
   data() {
      return {
         state: {
            error: '',
            teamName: '',
            teamRole: '',
            teamEmail: ''
         },
         roles: defaults.roles
      }
   },
   create: () => {
      const element = document.getElementById('projectName')
      element.focus()
   },
   methods: {
      addMember: (name, role, email) => {
         const errorState = {
            error: 'What\'s their name?',
            teamName: name,
            teamRole: role,
            teamEmail: email
         }
         if (name.length === 0) {
            const element = document.getElementById('teamName')
            element.focus()
            return errorState
         }
         if (email.length === 0) {
            const element = document.getElementById('teamEmail')
            errorState.error = 'What\'s their email?'
            element.focus()
            return errorState
         }

         const newMember = {
            name,
            role,
            email
         }
         store.commit('member', newMember)
         const element = document.getElementById('teamName')
         element.focus()
         const newState = {
            error: '',
            teamName: '',
            teamRole: '',
            teamEmail: ''
         }
         return newState
      }
   }
}
Vue.component('team', comp)
