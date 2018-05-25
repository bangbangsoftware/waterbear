import store from '../../store.js'

import {
    DOW,
    MOY,
    NORMAL,
    OFF,
    DS
} from './defaults.js'

const comp = {}

const getPostfix = n => 'th'

comp.createData = (day, now, lastMonth) => {
    const dd = now.getDate()
    const mm = now.getMonth()
    const yy = now.getFullYear()
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
    return {
        data,
        lastMonth
    }
}

comp.setup = (members, now = new Date()) => {
    const days = []
    let lastMonth = ''
    for (let day = -5; day < 15; day++) {
        const both = comp.createData(day, now, lastMonth)
        lastMonth = both.lastMonth
        days.push(both.data)
    }
    const project = store.state.session.project
    if (!members || members === undefined) {
        project.members = []
    }
    const list = JSON.parse(JSON.stringify(members))
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
    return {
        days,
        members: membersWithDiary
    }
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
        off.hours = 0
        off.display = total + ' hours'
        return off
    }
    const normal = JSON.parse(JSON.stringify(DS[NORMAL]))
    normal.display = total + ' hours'
        // normal.hours = total + ' hours'
    normal.hours = total
    normal.colour = colour
    normal.date = date
    return normal
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
            console.log('conflict:' + item[key])
            return false
        }
        keys.push(item[key])
        return true
    })
}

export default comp
