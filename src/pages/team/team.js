import Vue from 'vue'

import store from '../../store.js'
import beforeCreate from '../../loginCheck.js'

import user from '../../user.js'

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
    colour: 'grey',
    off: true
}, {
    id: 3,
    display: 'SICK',
    colour: 'grey',
    off: true
}]

const days = []

const setup = () => {
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
    const project = store.state.session.project
    const list = JSON.parse(JSON.stringify(project.members))
        // Have to to owner later...
        // list.push(project.owner)
    const membersWithDiary = comp.makeUnique(list, 'name').map(member => {
        if (member.diary) {
            return member
        }
        member.diary = days.map(dy => {
            const ds = comp.dayState(dy.date, member.days, dy.colour)
            return ds
        })
        return member
    })
    user.storeMembers(membersWithDiary)
}

const comp = {
    name: 'team',
    template,
    beforeCreate: function() {
        beforeCreate()
    },
    data: function() {
        setup()
        const showMenu = false
            // Seperate method and should insert days if
            // they don't exist and put state on session of the team....
        const d = {
            session: store.state.session,
            menu: store.state.menu,
            days,
            showMenu,
            x: 0,
            y: 0
        }
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
        toggle: function(memberNo, day) {
            console.log('toggling from %o and %o', memberNo, day)
            const members = this.session.project.members
            const member = members[memberNo]
            const currentState = member.diary[day]
            console.log(currentState)
            const nextState = comp.cycle(currentState)
            member.diary[day] = nextState
            console.log(nextState)
            members[memberNo] = member
            user.storeMembers(members)
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

comp.dayState = (date, days, colour = 'white') => {
    const wd = date.getDay()
    const day = days[wd]
    const nightHours = day.night.map(nt => (nt.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const dayHours = day.day.map(dy => (dy.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const total = dayHours + nightHours
    if (total === 0) {
        const off = JSON.parse(JSON.stringify(DS[OFF]))
        off.date = date
        return off
    }
    const normal = JSON.parse(JSON.stringify(DS[NORMAL]))
    normal.display = total + ' hours'
    normal.colour = colour
    normal.date = date
    return normal
}

Vue.component('team', comp)
export default comp