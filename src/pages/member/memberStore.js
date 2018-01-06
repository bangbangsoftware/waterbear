const nextState = hour => {
    if (hour.state !== undefined && hour.state === 'on') {
        return 'off'
    }
    if (hour.state === undefined || hour.state === 'wfh') {
        return 'on'
    }
    return 'wfh'
}

const toggle = (hour, time) => {
    const name = (hour.label) ? hour.label : hour.name
    hour.label = name
    hour.state = nextState(hour)
    hour.name = (hour.state === 'off') ? name : hour.state
    hour.on = (hour.state === 'on' || hour.state === 'wfh')
    return hour
}

// @TODO the hour is the index not the value needs remapping where restoring the label
export default {
    nick: (state, name) => {
        state.session.user.nick = name
    },
    toggleNight: (state, time) => {
        const oldHour = state.session.user.days[time.day].night[time.hour]
        const hour = toggle(oldHour, time)
        state.session.user.days[time.day].night[time.hour] = hour
        state.session.change = time
        return hour
    },
    toggleDay: (state, time) => {
        const oldHour = state.session.user.days[time.day].day[time.hour]
        const hour = toggle(oldHour, time)
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
