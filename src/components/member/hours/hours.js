import store from '../../../store.js'
import Vue from 'vue'
import template from './hours.html'
import './hours.css'

const defaultHours = (name, off) => {
   const dayHours = ['7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm']
   const nightHours = ['8pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am', '3am', '4am', '5am', '6am']

   let on = false
   const day = dayHours.map(h => {
      if (off) {
         return {
            'name': h,
            on
         }
      }
      if (h === '9am' || h === '1pm') {
         on = true
      }
      if (h === '12am' || h === '6pm') {
         on = false
      }
      return {
         'name': h,
         on
      }
   })
   on = false
   const night = nightHours.map(h => {
      return {
         'name': h,
         on
      }
   })
   return {
      name,
      day,
      night
   }
}

const comp = {
   name: 'hours',
   template,
   data: function() {
      return {
         session: store.state.session,
         days: store.state.session.user.days
      }
   },
   beforeCreate: () => {
      const storedDays = store.state.session.user.days
      if (typeof storedDays !== 'undefined') {
         console.log('Already have default working hours')
         return
      }
      console.log('Setting up default working hours')
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
         // for a test
         // for (let i = 0; i < 100; i++) {
         //   days.push('test day ' + i)
         // }

      days.forEach(name => {
         const off = (name === 'Saturday' || name === 'Sunday')
         const day = defaultHours(name, off)
         store.commit('day', day)
      })
   },
   methods: {
      toggleDay: (day, hour) => {
         store.commit('toggleDay', {
            day,
            hour
         })
      },
      toggleNight: (day, hour) => {
         store.commit('toggleNight', {
            day,
            hour
         })
      },
      save: () => {
         store.commit('updateMember', store.state.session)
      }
   }
}
Vue.component('hours', comp)
export default comp
