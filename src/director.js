const dev = (user, project) => {
    const now = new Date()
    const started = project.sprints.filter(startDate => now)
    if (started.length === 0) {
        // Not in a sprint?!.... need to request scrum master and po do a sprint planning meeting
        return 'work'
    }
    // Does the dev work on going?
    //    Is the times correct?
    //    Any blockers / distractions
    // Pick a new task from the sprint
    //
    return 'team'
}

const service = (user, project) => {
    if (user.role === 'Frontend Dev') {
        return dev(user, project)
    }

    if (user.role === 'Scrum Master') {
        return 'sprint/0'
    }

    return 'team'
}
export default service
