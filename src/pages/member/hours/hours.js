import store from '../../../store.js'
import Vue from 'vue'
import template from './hours.html'
import './hours.css'
import defaults from './default.js'

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
        const days = defaults()
        days.forEach(day => {
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
        colour: value => {
            if (value === 'on') {
                return 'green'
            }
             if (value === 'wfh') {
                return 'warning'
            }
        }
    }
}
Vue.component('hours', comp)
export default comp
