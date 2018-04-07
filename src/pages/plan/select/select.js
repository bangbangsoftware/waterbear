import Vue from 'vue'

import template from './select.html'
import './select.css'

import store from '../../../store.js'
import util from '../util.js'

const comp = {
    name: 'selectSprint',
    template,
    data: () => {
        const sprint = (store.state.session.project.sprints === undefined) ? {} : store.state.session.project.sprints[store.state.session.sprintIndex]
        return {
            project: store.state.session.project,
            session: store.state.session,
            sprint,
            editName: false,
            dialog: false
        }
    },
    methods: {
        deselect: () => {
            store.commit('selectSprint', -1)
            store.commit('planState', 'sprintSelect')
        },
        startSprint: function() {
            store.commit('planState', 'sprintSelect')
            this.dialog = false
        },
        toggleNameEdit: function() {
            this.editName = !this.editName
            store.commit('planState', 'sprintCreate')
        },
        removeFromSprint: function(story, index) {
            store.commit('takeFromSprint', index)
            util.updateSprints()
        }
    }
}

Vue.component('selectSprint', comp)
export default comp
