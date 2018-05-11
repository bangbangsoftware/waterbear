import store from '../../../store.js'
import Vue from 'vue'
import template from './dev.html'

import check from '../../../loginCheck.js'
import './time/time.js'

const comp = {
    name: 'opendev',
    beforeCreate: function() {
        check()
    },
    template,
    data: function() {
        const session = store.state.session
        const project = session.project
        const sprint = (project.sprints === undefined) ? {} : project.sprints[session.sprintIndex]
        console.log(sprint)
        return {
            session,
            sprint
        }
    },
    methods: {}
}

Vue.component('refine', comp)

export default comp
