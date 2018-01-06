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
    state: 0,
    display: '',
    off: false
}, {
    state: 1,
    display: 'WFH',
    off: false
}, {
    state: 2,
    display: 'OFF',
    colour: 'grey',
    off: true
}, {
    state: 3,
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
    if (!project.members || project.members === undefined) {
        project.members = []
    }
    const list = JSON.parse(JSON.stringify(project.members))
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
            let currentState = member.diary[day]
            if (!currentState.hours) {
                currentState.hours = currentState.display
            }
            const nextState = comp.cycle(currentState)
            member.diary[day] = nextState
            const now = new Date()
            member.diary = member.diary.map((d, i) => {
                if (d.off) {
                    d.colour = 'grey'
                } else if (!d.off && comp.today(d.date)) {
                    d.colour = 'green'
                } else if (d.date < now) {
                    d.colour = 'grey'
                } else {
                    d.colour = 'white'
                }
                return d
            })
            members[memberNo] = member
            user.storeMembers(members)
            return nextState
        }
    }
}

comp.today = (dateString) => {
    const now = new Date()
    const d = new Date(dateString)
    if (now.getDate() !== d.getDate()) {
        return false
    }
    if (now.getMonth() !== d.getMonth()) {
        return false
    }
    if (now.getFullYear() !== d.getFullYear()) {
        return false
    }
    return true
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

comp.display = newState => {
    if (newState.hours) {
        return newState.hours
    }
    return newState.total === undefined ? '0 hours' : newState.total + ' hours'
}

comp.cycle = current => {
    const next = (current.state + 1 === DS.length) ? 0 : current.state + 1
    const newState = JSON.parse(JSON.stringify(DS[next]))
    newState.hours = current.hours
    newState.date = current.date
    if (newState.state === 0) {
        newState.display = comp.display(newState)
    }
    return newState
}

comp.dayState = (date, days, colour = 'white') => {
    const wd = date.getDay()
    const day = days[wd]
    const nightHours = day.night.map(nt => (nt.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const dayHours = day.day.map(dy => (dy.on) ? 1 : 0).reduce((total, curr) => total + curr)
    const total = (dayHours + nightHours) === undefined ? 0 : dayHours + nightHours
    if (total === 0) {
        const off = JSON.parse(JSON.stringify(DS[OFF]))
        off.date = date
        off.display = total + ' hours'
        return off
    }
    const normal = JSON.parse(JSON.stringify(DS[NORMAL]))
    normal.display = total + ' hours'
    normal.hours = total + ' hours'
    normal.colour = colour
    normal.date = date
    return normal
}

Vue.component('team', comp)
export default comp
