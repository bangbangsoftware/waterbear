import is from '../valid/validSprint'
import util from '../util'

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
const addTime = (h, map, total, end = 23) => {
    if (h > end) {
        return total
    }

    if (map[h].on) {
        return addTime(h + 1, map, total + 1, end)
    }

    return addTime(h + 1, map, total, end)
}

const rangeState = (current, end, user, results) => {
    if (current.getTime() > end.getTime()) {
        return results
    }
    const state = comp.currentHours(current, user)
    const newResults = results + state.done 

    const next = nextDay(current)
    return rangeState(next, end, user, newResults)
}

const nextDay = current => {
    const hh = current.getHours()
    const mins = current.getMinutes()
    const dd = current.getDate() + 1
    const mm = current.getMonth()
    const yy = current.getFullYear()
    return new Date(yy, mm, dd, hh, mins)
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
                state: "You have no tasks",
                description: ""
            }
        }

        return {}
    },
    hours: (user, now = Date()) => {
        const days = user.diary.filter(d => util.today(d.date, now));
        const day = (days.length > 0) ? days[0] : {
            off: false,
            hours: 8
        }
        if (day.off) {
            return 0
        }
        return comp.hoursLeftToday(now, user)
    },
    hoursLeftToday: (now, user) => {
        const dayIndex = now.getDay()
        const dayHours = user.days[dayIndex]
        const current24Hour = now.getHours()
        const map = comp.hourMap(dayHours)
        const total = addTime(current24Hour, map, 0)
        return total
    },
    hoursDoneToday: (now, user) => {
        const dayIndex = now.getDay()
        const dayHours = user.days[dayIndex]
        const current24Hour = now.getHours()
        const map = comp.hourMap(dayHours)
        const start = map[0].on ? 1 : 0
        const total = addTime(0, map, start, current24Hour)
        return total
    },
    currentHours: (now, user) => {
        const done = comp.hoursDoneToday(now, user)
        const left = comp.hoursLeftToday(now, user)
        return {
            done,
            left
        }
    },
    taskState: (task, user, now = Date()) => {
        const start = task.start
        if (!start) {
            return {
                done: 0,
                left: task.est
            }
        }
        const state = comp.currentHours(start, user).left
        const next = start
        const done = rangeState(next, now, user, state)
        const left = task.est - done
        return {
            done,
            left
        }
    },
    left: (sprint, user, now = Date(), total = 0) => {
        const start = sprint.startDate
        const dd = start.getUTCDate()
        const mm = start.getUTCMonth()
        const yy = start.getUTCFullYear()
        for (let day = 0; day < sprint.days; day++) {
            const next = new Date(yy, mm, dd + day)
            const today = util.today(next, now)
            if (today || next.getTime() > now.getTime()) {
                const hours = comp.hours(user, next)
                total = total + hours
            }
        }
        return total
    },
    hoursLeft: (sprint, members, now = Date()) => {
        return members.map(user => comp.left(sprint, user, now)).reduce((t, c) => t + c)
    },
    tasksNotStarted: sprint => {
        return comp.tasksStat(getTasksOfStatus(sprint, "todo"))
    },
    tasksOnGoing: sprint => {
        return comp.taskStat(getTasksOfStatus(sprint, "ongoing"))
    },
    tasksCompleted: sprint => {
        return comp.taskStat(getTasksOfStatus(sprint, "done"))
    },
    tasksStat: tasks => {
        return {
            qty: tasks.length,
            est: tasks.map(t => t.est).reduce((t, c) => t + c),
            tasks
        }
    },
    workhours: (member, from, to) => {

    },
    contingency: (sprint, now) => {
        const notStarted = comp.tasksNoStarted(sprint)
        const onGoing = comp.tasksOnGoing(sprint)
            // work out how many hours have been done on each task, map it against member and
            // there diary
    },
    mapper: v => {
        const posfix = v.substring(v.length - 2)
        const value = parseInt(v.substring(0, v.length - 2))
        const result = (posfix === 'pm') ? value + 12 : value
        if (result > 23) {
            return 0
        }
        return result
    },
    hourMap: (dayHours) => {
        const hours = []
        hours.push(...dayHours.day)
        hours.push(...dayHours.night)
        const map = {}
        hours.forEach(h => {
            const key = comp.mapper(h.name)
            map[key] = h
        })
        return map
    },
}

export default comp

// impact * cost * confidence / time = score
