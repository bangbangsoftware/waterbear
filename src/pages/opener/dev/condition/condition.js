import store from '../../../../store.js'
import Vue from 'vue'
import check from '../../../../loginCheck.js'

const comp = {
    name: 'condition',
    beforeCreate: function() {
        check()
    },
    data: function() {
        const session = store.state.session
        const project = session.project
        return {
            session,
            project
        }
    },
    methods: {}
}

Vue.component('condition', comp)

export default comp
