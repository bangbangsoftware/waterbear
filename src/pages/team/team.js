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

const makeUnique = (list, key) => {
    const keys = []
    return list.filter(item => {
        if (keys.indexOf(item[key]) > -1) {
            return false
        }
        keys.push(item[key])
        return true
    })
}

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
        const showMenu = false
        for (let day = -5; day < 15; day++) {
            const date = new Date(yy, mm, dd + day)
            const dom = date.getDate()
            const moy = MOY[date.getMonth()]
            const newMonth = (lastMonth === moy) ? false : moy
            lastMonth = moy
            const format = ' ' + DOW[date.getDay()] + ' the ' + dom + getPostfix(dom)
            const colour = (day === 0) ? 'green' : (day < 0) ? 'grey' : 'white'
            const state = ''
            const data = {
                format,
                date,
                newMonth,
                colour,
                state
            }
            days.push(data)
        }
        const list = JSON.parse(JSON.stringify(project.members))
        list.push(project.owner)
        const members = makeUnique(list, 'name').map(member => {
            member.days = days.map(day => day.state)
            return member
        })
        console.log('we have %o members', members.length)
        return {
            session: store.state.session,
            menu: store.state.menu,
            days,
            members,
            showMenu,
            x: 0,
            y: 0
        }
    },
    methods: {
        show(e) {
            e.preventDefault()
            this.showMenu = true
            this.x = e.clientX
            this.y = e.clientY
        },
        save: () => {},
        wfh: (c, day) => {
            console.log('Working from home %o, %o', c, day.format)
        },
        sick: (c) => {},
        holiday: (c) => {}
    }
}

Vue.component('team', comp)
export default comp
