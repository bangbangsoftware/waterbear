import is from '../valid/validSprint'
import util from '../util'
import tasks from './tasks.js'
import conting from './contingency.js'

const getAssignedTasks = (tasks, user) => {
    return tasks.filter(t => (t.assignedTo && t.assignedTo.id === user.id))
}

const exists = what => {
    if (what === undefined) {
        return false
    }
    if (what === null) {
        return false
    }
    return (what)
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
    hoursDoneToday: (now, user) => util.hoursDoneToday(now, user),
    currentHours: (now, user) => util.currentHours(now, user),
    contingency: (sprint, members, now) => {
        const all = tasks.allTasks(sprint)
        return conting(sprint, members, now, all)
    },
    taskState: (task, user, now = Date()) => tasks.taskState(task, user, now),
    left: (sprint, user, now = Date(), total = 0) => {
        return util.left(sprint, user, now, total)
    },
    hoursLeft: (sprint, members, now = Date()) => {
        return members.map(user => comp.left(sprint, user, now)).reduce((t, c) => t + c)
    },
    tasksNotStarted: sprint => tasks.tasksNotStarted(sprint),
    tasksOnGoing: sprint => tasks.tasksOnGoing(sprint),
    tasksCompleted: sprint => tasks.tasksCompleted(sprint),
    tasksStat: tasks => {
        return {
            qty: tasks.length,
            est: tasks.map(t => t.est).reduce((t, c) => t + c),
            tasks
        }
    },
    mapper: v => util.mapper(v),
    hours: (user, now = Date()) => util.hours(user, now),
    hourMap: (dayHours) => util.hourMap(dayHours)
}
export default comp
// impact * cost * confidence / time = score
