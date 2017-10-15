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

const NORMAL = 0
const OFF = 2

const DS = [{
    id: 0,
    display: '',
    off: false
}, {
    id: 1,
    display: 'WFH',
    off: false
}, {
    id: 2,
    display: 'OFF',
    off: true
}, {
    id: 3,
    display: 'SICK',
    off: true
}]

const comp = {
    name: 'team',
    beforeCreate,
    template,
    data: function() {
        const days = []
        const now = new Date()
        const dd = now.getDate()
        const mm = now.getMonth()
        const yy = now.getFullYear()
        let lastMonth = ''
        const showMenu = false
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
        // Seperate method and should insert days if
        // they don't exist and put state on session of the team....
        const project = store.state.session.project
        const list = JSON.parse(JSON.stringify(project.members))
        list.push(project.owner)
        const members = comp.makeUnique(list, 'name').map(member => {
            member.days = days.map(day => comp.dayState(day.date, member.days))
                // member.days = days.map(day => DS[NORMAL])
            return member
        })
        console.log('we have %o members', members.length)
        const d = {
            session: store.state.session,
            menu: store.state.menu,
            days,
            members,
            showMenu,
            x: 0,
            y: 0
        }
        console.log(d)
        return d
    },
    methods: {
        show(e) {
            e.preventDefault()
            this.showMenu = true
            this.x = e.clientX
            this.y = e.clientY
        },
        save: () => {},
        toggle: function(member, day) {
            console.log('toggling from %o and %o', member, day)
            const currentState = this.members[member].days[day]
            const nextState = comp.cycle(currentState)
            this.members[member].days[day] = nextState
            console.log(nextState)
            return nextState
        }
    }
}

comp.makeUnique = (list, key) => {
    const keys = []
    return list.filter(item => {
        if (keys.indexOf(item[key]) > -1) {
            return false
        }
        keys.push(item[key])
        return true
    })
}

comp.cycle = state => {
    const next = (state.id + 1 === DS.length) ? 0 : state.id + 1
    return DS[next]
}

comp.dayState = (date, days) => {
    const wd = date.getDay()
    const day = days[wd]
    const nightHours = day.night.map(nt => (nt.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const dayHours = day.day.map(dy => (dy.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const total = dayHours + nightHours
    if (total === 0) {
        return DS[OFF]
    }
    const normal = DS[NORMAL]
    normal.display = total + ' hours'
    return normal
}

Vue.component('team', comp)
export default comp
