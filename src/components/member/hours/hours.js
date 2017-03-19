import store from '../../../store.js'
import Vue from 'vue'
import template from './hours.html'

const comp = {
   name: 'hours',
   template,
   data: function() {
      return {
         session: store.state.session
      }
   },
   create: () => {
      const user = store.state.session.user
      if (typeof user.hours === 'undefined' || user.hours.length === 0) {
         store.commit('hours', {
            'name': 'Sunday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Monday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Tuesday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Wednesday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Thursdday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Friday',
            from: 0,
            to: 0
         })
         store.commit('hours', {
            'name': 'Saturday',
            from: 0,
            to: 0
         })
      }
      const element = document.getElementById('from')
      element.focus()
   },
   methods: {
      change: (index, dayHours) => {
         if (dayHours) {
            store.commit('hours', dayHours)
         }
         const element = document.getElementById('from')
         if (element) {
            element.focus()
         }
      }

   }
}
Vue.component('hours', comp)
export default comp
