import Vue from 'vue'

import store from '../../../store.js'

import template from './task.html'
import valid from './valid'
import util from '../util.js'

const comp = {
    name: 'task',
    template,
    beforeCreate: () => {
        if (!store.state.session.task) {
            store.commit('clearTask')
        }
    },
    data: () => {
        return {
            session: store.state.session,
            skills: store.state.defaults.skills,
            newSkill: 'Add skill'
        }
    },
    methods: {
        storeTask: task => util.storeTask(task),
        storeName: value => store.commit('taskName', value),
        storeDesc: desc => store.commit('taskDesc', desc),
        storeSkill: value => store.commit('taskSkill', value),
        storeEst: (value) => {
            const num = parseInt(value)
            store.commit('taskEst', num)
        },
        postTask: function(task) {
            var ok = valid(task)
            if (!ok) {
                console.log('invalid task...')
                console.log(task)
                return
            }
            console.log('posting task')
            store.commit('task', task)
            comp.methods.storeTask(task)
        },
        exit: function() {
            const state = util.next(this.session)
            store.commit('planState', state)
        }
    }
}

Vue.component('task', comp)
export default comp
