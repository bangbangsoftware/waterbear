import util from '../util'

const getTasksOfStatus = (sprint, status) => {
    const tasks = comp.allTasks(sprint)
    return tasks.filter(t => (t.status && t.status === status))
}
const rangeState = (current, end, user, results) => {
    const next = nextDay(current, 1, end.getHours(), end.getMinutes())
    if (next.getTime() > end.getTime()) {
        return results
    }
    const state = util.currentHours(next, user)
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
    return (what) ? true : false
}

const comp = {
    allTasks: sprint => {
        const tasks = []
        sprint.list.filter(story => story.tasks)
            .map(story => tasks.push(...story.tasks))
        return tasks
    },
    taskState: (task, user, now = Date()) => {
        const skilled = (user.skills) ? user.skills.filter(s => s === task.skill).length > 0 : false
        const start = task.start
        const paused = exists(task.paused)
        const abandoned = exists(task.abandoned)
        const result = {
            skilled,
            done: 0,
            left: parseInt(task.est),
            finished: false,
            paused,
            abandoned
        }
        if (abandoned) {
            result.finished = true
            result.left = 0
            result.done = task.abandoned.hoursWasted
            result.reason = task.abandoned.reason
            return result
        }

        if (!start) {
            return result
        }
        result.finished = exists(task.end)
        const until = result.finished ? task.end : result.paused ? task.paused : now
        const blocked = (task.blockers) ? task.blockers.map(blocker => blocker.hours).reduce((t, c) => t + c) : 0
        const state = util.currentHours(start, user)
        const today = util.today(start, until)
        if (today) {
            result.done = state.done - blocked
            result.left = task.est - result.done
            return result
        }

        const workDone = rangeState(start, until, user, state.left)
        result.done = workDone - blocked
        result.left = task.est - result.done
        return result
    },
    skillHoursLeft: (sprint, now) => {
        const tasks = sprint.tasks
        const mapper = {}
        const notStartedHours = comp.allTasks(sprint).filter(t => !t.start)
        notStartedHours.forEach(t => {
            const qty = mapper[t.skill];
            mapper[t.skill] = (qty === undefined) ? t.est : qty + t.est
        })
        comp.allTasks(sprint)
            .filter(t => t.start && !t.end)
            .forEach(task => {
                const state = comp.taskState(task, task.assignedTo, now)
                const qty = mapper[task.skill]
                mapper[task.skill] = (qty === undefined) ? task.est : qty + task.est
            })
        const keys = Object.keys(mapper)
        return keys.map(k => {
            return {
                name: k,
                hours: mapper[k]
            }
        })
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
    tasksStat: (tasks, now) => {
        return {
            qty: tasks.length,
            est: tasks.map(t => t.est).reduce((t, c) => t + c),
            tasks
        }
    },
}
export default comp
// impact * cost * confidence / time = score
