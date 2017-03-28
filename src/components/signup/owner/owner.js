import store from '../../../store.js'
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
      owner: (name, role) => {
         if (name.length === 0) {
            const element = document.getElementById('ownername')
            if (element) {
               element.focus()
            }
            return 'What\'s your name?'
         }
         const email = store.state.signup.stages[0].email
         store.commit('log', 'Hi ' + name + ' (' + email + ')')
         store.commit('owner', {
            name,
            email,
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
