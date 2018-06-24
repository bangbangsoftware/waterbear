import store from '../../../../store.js'
import Vue from 'vue'
import check from '../../../../loginCheck.js'


const comp = {
    name: 'blockers',
    beforeCreate: function() {
        check()
    },
    data: function() {
        const session = store.state.session
        const project = session.project
        const reasons = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
        const blocker = ''
        return {
            session,
            project,
            reasons,
            blocker
        }
    },
    methods: {
        handleSelected: function() {
            return this.reasons
        }
    }
}

Vue.component('blockers', comp)

export default comp
