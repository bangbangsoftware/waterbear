
import util from '../util'

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
    return memberTime.filter(m => hasSkill(m, skill))
        .map(m => m.left)
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
            const newState = update(m, amount)
            balance = newState.remainder
            return newState.memberTime
        }
        return m
    })
    return fill(newMemberTime, skill, balance)
}


const comp = (sprint, members, now, tasks) => {

    // how much time does each member have left in the sprint????
    let memberTime = members.map(m => {
        const left = util.left(sprint, m, now)
        return {
            left,
            skills: m.skills
        }
    })

    // how much tasks are left to do??
    const taskMap = {}

    tasks.forEach(task => {
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
        skillBalance.push({
            name: skill,
            left: state.remainder
        })
    })

    return {
        skills: skillBalance,
        members: memberTime
    }
}

export default comp
