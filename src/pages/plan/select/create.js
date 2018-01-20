import Vue from 'vue'

import template from './create.html'

import store from '../../../store.js'
import util from '../util.js'

const storeSprint = (sprint) => {
    const prj = store.state.session.project
    console.log('Adding sprint to project')
    console.log(prj)
    const db = store.state.db
    db.get(prj._id)
        .then(p => {
            let sprints = p.sprints
            if (!sprints) {
                sprints = []
            }
            sprints.push(sprint)
            p.sprints = sprints
            return db.put(p)
        })
        .catch(err => console.error(err))
}

const comp = {
    name: 'sprint-create',
    template,
    data: () => {
        return {
            session: store.state.session,
            sprint: store.state.session.sprint
        }
    },
    methods: {
        storeName: name => {
            store.commit('sprintName', name)
        },
        storeDays: days => {
            store.commit('sprintDays', days)
        },
        changeState: function() {
            console.log('Change from state from create')
            const state = util.next(store.state.session)
            store.commit('planState', state)
        },
        postSprint: () => {
            store.commit('postSprint', store.state.session.sprint)
            storeSprint(store.state.session.sprint)
            const state = util.next(store.state.session)
            store.commit('planState', state)
        }
    }
}

Vue.component('sprint-create', comp)
export default comp
