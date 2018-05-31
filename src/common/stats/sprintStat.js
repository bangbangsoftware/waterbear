import is from '../valid/validSprint'
import util from '../util'
import conting from './contingency.js'

const allTasks = sprint => {
    const tasks = []
    sprint.list.filter(story => story.tasks)
        .map(story => tasks.push(...story.tasks))
    return tasks
}

const getAssignedTasks = (tasks, user) => {
    return tasks.filter(t => (t.assignedTo && t.assignedTo.id === user.id))
}

const getTasksOfStatus = (sprint, status) => {
    const tasks = allTasks(sprint)
    return tasks.filter(t => (t.status && t.status === status))
}
const rangeState = (current, end, user, results) => {
    const next = nextDay(current, 1, end.getHours(), end.getMinutes())
    if (next.getTime() > end.getTime()) {
        return results
    }
    const state = comp.currentHours(next, user)
    const newResults = results + state.done

    return rangeState(next, end, user, newResults)
}

const nextDay = (current, plus = 1, hh = current.getHours(), mins = current.getMinutes()) => {
    const dd = current.getDate() + plus
    const mm = current.getMonth()
    const yy = current.getFullYear()
    return new Date(yy, mm, dd, hh, mins, 0, 0)
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
        const tasks = allTasks(sprint)
        const userTasks = getAssignedTasks(tasks, user)
        if (!userTasks.length) {
            return {
                state: 'You have no tasks',
                description: ''
            }
        }
        return {}
    },
    hoursDoneToday: (now, user) => util.hoursDoneToday(now,user), 
    currentHours: (now, user) => {
        const done = util.hoursDoneToday(now, user)
        const left = util.hoursLeftToday(now, user)
        return {
            done,
            left
        }
    },
    contingency: (sprint, members, now) => {
        const tasks = allTasks(sprint)
        return conting(sprint, members, now, tasks)
    },
    taskState: (task, user, now = Date()) => {
        const skilled = (user.skills) ? user.skills.filter(s => s === task.skill).length > 0 : false
        const start = task.start
        if (!start) {
            return {
                skilled,
                done: 0,
                left: parseInt(task.est)
            }
        }
        const end = task.end
        const until = exists(end) ? end : now
        const state = comp.currentHours(start, user)
        const today = util.today(start, until)
        if (today) {
            const done = state.done
            const left = task.est - done
            return {
                skilled,
                done,
                left
            }
        }

        const done = rangeState(start, until, user, state.left)
        const left = task.est - done
        return {
            skilled,
            done,
            left
        }
    },
    left: (sprint, user, now = Date(), total = 0) => {
        return util.left(sprint, user, now, total)
    },
    hoursLeft: (sprint, members, now = Date()) => {
        return members.map(user => comp.left(sprint, user, now)).reduce((t, c) => t + c)
    },
    tasksNotStarted: sprint => {
        return comp.tasksStat(getTasksOfStatus(sprint, 'todo'))
    },
    tasksOnGoing: sprint => {
        return comp.taskStat(getTasksOfStatus(sprint, 'ongoing'))
    },
    tasksCompleted: sprint => {
        return comp.taskStat(getTasksOfStatus(sprint, 'done'))
    },
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
