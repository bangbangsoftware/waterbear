import store from '../../../store.js'
import Vue from 'vue'
import template from './dev.html'

import check from '../../../loginCheck.js'
import './time/time.js'

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
    const spt = session.project.sprints[session.sprintIndex]
    spt.defined = true
    return spt
}

const comp = {
    name: 'opendev',
    beforeCreate: function() {
        check()
    },
    template,
    data: function() {
        const session = store.state.session
        const project = session.project
        const noSprint = (!session.sprintIndex || session.sprintIndex < 0 || project.sprints === undefined || project.sprints.length === 0)
        return {
            session,
            sprint: (noSprint) ? sprintless(session) : sprint(session)
        }
    },
    methods: {}
}

Vue.component('refine', comp)

export default comp
