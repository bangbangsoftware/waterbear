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
   beforeCreate: () => {
      const user = store.state.session.user
      if (typeof user.hours === 'undefined' || user.hours.length === '') {
         store.commit('hours', {
            'name': 'Sunday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Monday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Tuesday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Wednesday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Thursdday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Friday',
            from: '',
            to: ''
         })
         store.commit('hours', {
            'name': 'Saturday',
            from: '',
            to: ''
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
