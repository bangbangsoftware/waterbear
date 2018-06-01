import util from '../util'
import tasks from './tasks.js'

const addTask = (map, skill, qty) => {
    const amount = parseInt(qty)
    const total = map[skill]
    const newTotal = (total === undefined) ? amount : total + amount;
    map[skill] = newTotal
}

const hasSkill = (m, skill) => {
    const skills = m.skills
    const index = skills.indexOf(skill)
    return (index > -1)
}

const update = (memberTime, take) => {
    const left = memberTime.left
    const skills = memberTime.skills
    const newLeft = (left >= take) ? left - take : 0
    const remainder = (newLeft === 0) ? take - left : 0
    return {
        memberTime: {
            left: newLeft,
            skills
        },
        remainder
    }
}

const totalTime = (memberTime, skill) => {
    const skillBase = memberTime.filter(m => hasSkill(m, skill))
    if (skillBase.length === 0) {
        return 0
    }
    return skillBase.map(m => m.left)
        .reduce((t, c) => t + c)
}

const fill = (memberTime, skill, amount) => {
    if (totalTime(memberTime, skill) < 1) {
        return {
            memberTime,
            remainder: amount
        }
    }
    if (amount < 1) {
        return {
            memberTime,
            remainder: 0
        }
    }
    let balance = amount
    const newMemberTime = memberTime.map(m => {
        if (hasSkill(m, skill)) {
            const newState = update(m, balance)
            balance = newState.remainder
            return newState.memberTime
        }
        return m
    })
    return fill(newMemberTime, skill, balance)
}


const comp = (sprint, members, now) => {

    const work = tasks.allTasks(sprint)

    // how much time does each member have left in the sprint????
    let memberTime = members.map(user => {
        const left = util.hoursLeftInSprint(sprint, user, now)
        return {
            left,
            skills: user.skills
        }
    })

    // how much tasks are left to do??
    const taskMap = {}
    work.forEach(task => {
        const skill = task.skill
        if (task.end) {
            return
        }
        if (task.start) {
            addTask(taskMap, skill, task.est) // @TODO!!!! work out how much is left from est...
            return;
        }
        addTask(taskMap, skill, task.est)
    })

    // go through all keys in keys in taskMap and see if all the hours can be sent across members
    const skills = Object.keys(taskMap);
    const skillBalance = []
    skills.forEach(skill => {
        const take = taskMap[skill]
        const state = fill(memberTime, skill, take)
        memberTime = state.memberTime
        const name = skill
        const onTrack = (state.remainder === 0)
        const hoursOver = state.remainder
        skillBalance.push({
            name,
            onTrack,
            hoursOver,
        })
    })
    const totalHoursLeft = memberTime.map(m => m.left).reduce((t, c) => t + c)
    return {
        skills: skillBalance,
        members: memberTime,
        totalHoursLeft
    }
}

export default comp
