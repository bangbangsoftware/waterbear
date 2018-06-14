import store from '../../../store.js'
import Vue from 'vue'

import check from '../../../loginCheck.js'
import './time/time.js'
import blockers from './blockers/blockers.vue'
import condition from './condition/condition.vue'

const sprintless = session => {
    const owner = session.project.members.filter(m => m.owner)
    const name = (session.user.owner) ? 'You need to start a sprint!' : 'There is no sprint running, talk to ' + owner.nick
    const defined = false
    const needSprint = {
        name,
        defined
    }
    return needSprint
}

const sprint = session => {
    const spt = session.project.sprints[session.project.current.sprintIndex]
    spt.defined = true
    return spt
}

const comp = {
    name: 'opendev',
    components: {
        blockers,
        condition
    },
    beforeCreate: function() {
        check()
    },
    data: function() {
        const session = store.state.session
        const project = session.project
        const noSprint = (session.project.current.sprintIndex < 0 || project.sprints === undefined || project.sprints.length === 0)
        return {
            session,
            sprint: (noSprint) ? sprintless(session) : sprint(session)
        }
    },
    methods: {}
}

Vue.component('opendev', comp)

export default comp
