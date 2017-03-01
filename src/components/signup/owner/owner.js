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
            element.focus()
            return 'What\'s your name'
         }
         store.commit('log', 'Hi ' + name)
         store.commit('owner', {
            name,
            role
         })
         store.commit('stage', {
            name,
            role
         })
         return ''
      }
   }
}

Vue.component('owner', comp)
