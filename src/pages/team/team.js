import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import template from './team.html'
import './team.css'

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MOY = ['January',
    'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const getPostfix = n => 'th'

const comp = {
    name: 'team',
    beforeCreate,
    template,
    data: () => {
        const project = store.state.session.project
        const days = []
        const now = new Date()
        const dd = now.getDate()
        const mm = now.getMonth()
        const yy = now.getFullYear()
        let lastMonth = ''
        for (let day = -5; day < 15; day++) {
            const date = new Date(yy, mm, dd + day)
            const dom = date.getDate()
            const moy = MOY[date.getMonth()]
            const newMonth = (lastMonth === moy) ? false : moy
            lastMonth = moy
            const format = ' ' + DOW[date.getDay()] + ' the ' + dom + getPostfix(dom)
            const colour = (day === 0) ? 'green' : (day < 0) ? 'grey' : 'white'
            const data = {
                format,
                date,
                newMonth,
                colour
            }
            days.push(data)
        }
        const members = JSON.parse(JSON.stringify(project.members))
        members.push(project.owner)
        return {
            session: store.state.session,
            menu: store.state.menu,
            days,
            members
        }
    },
    methods: {
        save: () => {}
    }
}

Vue.component('team', comp)
export default comp
