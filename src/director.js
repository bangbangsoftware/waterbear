const service = user => {
    if (user.role === 'Frontend Dev') {
        return 'work'
    }

    if (user.role === 'Scrum Master') {
        return 'sprint/0'
    }

    return 'team'
}
export default service
