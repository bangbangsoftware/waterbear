import is from '../valid/validSprint'
import util from '../util'
import tasks from './tasks.js'
import contingency from './contingency.js'

const getAssignedTasks = (taks, user) => {
    return taks.filter(t => (t.assignedTo && t.assignedTo.id === user.id))
}

const comp = {
    state: (sprint, user, now = new Date()) => {
        const fail = is.invalid(sprint, now)
        if (fail) {
            return fail
        }
        const all = tasks.allTasks(sprint)
        const userTasks = getAssignedTasks(all, user)
        if (!userTasks.length) {
            return {
                state: 'You have no tasks',
                description: ''
            }
        }
        return {}
    },
    contingency: (sprint, members, now) => {
        const all = tasks.allTasks(sprint)
        return contingency(sprint, members, now, all)
    },
    hoursLeft: (sprint, members, now = Date()) => {
        return members.map(user => util.hoursLeftInSprint(sprint, user, now)).reduce((t, c) => t + c)
    },
    tasksStat: tsks => {
        return {
            qty: tsks.length,
            est: tsks.map(t => t.est).reduce((t, c) => t + c),
            tsks
        }
    },
}
export default comp
// impact * cost * confidence / time = score
