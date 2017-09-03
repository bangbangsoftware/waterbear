import store from '../../../store.js'
import Vue from 'vue'
import template from './skills.html'

const comp = {
    name: 'skills',
    template,
    data: function() {
        return {
            //         skills: store.state.session.user.skills,
            skills: store.state.defaults.skills,
            //         defs: store.state.defaults,
            session: store.state.session,
            taglist: [] // store.state.defaults
        }
    },
    methods: {
        changed: () => {
            console.log('Skills changed')
        }
    }
}

Vue.component('skills', comp)
export default comp
