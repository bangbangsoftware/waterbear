const nextState = hour => {
    if (hour.state !== undefined && hour.state === 'on') {
        return 'off'
    }
    if (hour.state === undefined || hour.state === 'wfh') {
        return 'on'
    }
    return 'wfh'
}

const currentName = (state, time, p) => {
    const direction = time.hour > 0 ? -1 : 1
    const next = time.hour + direction
    const hour = state.session.user.days[time.day][p][next]
    const number = Number.parseInt(hour.name) + (direction * -1)
    if (number > 12) {
        const postfix = (hour.name.indexOf('am') > -1) ? 'pm' : 'am'
        return '1' + postfix
    }
    const postfix = (hour.name.indexOf('pm') > -1) ? 'pm' : 'am'
    return number + postfix
}

// @TODO the hour is the index not the value needs remapping where restoring the label
export default {
    nick: (state, name) => {
        state.session.user.nick = name
    },
    toggleNight: (state, time) => {
        const hour = state.session.user.days[time.day].night[time.hour]
        const name = currentName(state, time, 'night')
        hour.state = nextState(hour)
        hour.name = (hour.state === 'off') ? name : hour.state
        state.session.user.days[time.day].night[time.hour] = hour
        state.session.change = time
        return hour
    },
    toggleDay: (state, time) => {
        const hour = state.session.user.days[time.day].day[time.hour]
        const name = currentName(state, time, 'day')
        hour.state = nextState(hour)
        hour.name = (hour.state === 'off') ? name : hour.state
        state.session.user.days[time.day].day[time.hour] = hour
        state.session.change = time
        return hour
    },
    day: (state, hours) => {
        if (!state.session.user.days) {
            state.session.user.days = []
        }
        state.session.user.days.push(hours)
    },
    addMember: (state, member) => {
        state.members.push(member)
    },
    replaceMembers: (state, members) => {
        state.members = members
    },
    updateMember: (state, memData) => {
        state.members[memData.memberNo] = memData.member
    }
}
