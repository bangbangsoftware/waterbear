const empty = obj => {
    if (!obj) {
        return true
    }
    if (obj === undefined) {
        return true
    }

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    }
    return false
}

const unfinished = sprint => {
    if (empty(sprint)) {
        return "Nothing in the sprint"
    }

    if (!sprint.list) {
        return "No stories in the sprint"
    }

    if (!sprint.list.length) {
        return "No stories in the sprint"
    }

    console.log("sprint list is ", sprint.list)
    const allTasks = sprint.list.filter(story => story.tasks)
        .map(story => story.tasks)
    console.log("all tasks", allTasks.length)

    if (allTasks.length === 0) {
        return "No tasks in the stories"
    }

    return false
}

const howManyDays = (dateString, now) => {
    const date = new Date(dateString)
    var timeDiff = Math.abs(now.getTime() - date.getTime())
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays
}

const noTaskStarted = sprint => {
    const stories = sprint.list.filter(story => {
        const startedTasks = story.tasks.filter(task => task.startDate)
        return startedTasks.length > 0
    })
    return stories.length === 0
}

const invalid = (sprint, now = new Date()) => {
    const fail = unfinished(sprint)
    if (fail) {
        return {
            state: "The sprint isn't defined yet",
            description: fail
        }
    }
    if (!sprint.startDate) {
        return {
            state: "The sprint hasn't started yet"
        }
    }

    const sinceStart = howManyDays(sprint.startDate, now)
    const nothingStarted = noTaskStarted(sprint)
    if (nothingStarted && sinceStart > 0) {
        return {
            state: "The sprint has a false start",
            description: "It started " + sinceStart + " days ago but no task have started yet"
        }
    }
    return false
}

export default {
    invalid,
    howManyDays
}

// impact * cost * confidence / time = score
