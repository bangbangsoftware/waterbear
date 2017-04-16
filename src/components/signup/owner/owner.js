import store from '../../../store.js'
import user from '../../../user.js'
import Vue from 'vue'
import template from './owner.html'

const comp = {
   name: 'owner',
   template,
   data() {
      return {
         ownerName: '',
         ownerRole: '',
         roles: store.state.defaults.roles,
         error: ''
      }
   },
   mounted: () => {
      const element = document.getElementById('ownername')
      element.focus()
   },
   methods: {
      owner: (nick, role) => {
         if (nick.length === 0) {
            const element = document.getElementById('ownername')
            if (element) {
               element.focus()
            }
            return 'What\'s your name?'
         }
         const email = store.state.signup.stages[0].name
         store.commit('log', 'Hi ' + nick + ' (' + email + ')')
         user.ownerAndDefaults({
            nick,
            name: email,
            role
         })
         store.commit('stage', {
            name,
            email,
            role
         })
         return ''
      }
   }
}

Vue.component('owner', comp)
export default comp
