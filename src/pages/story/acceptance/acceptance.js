import store from '../../../store.js'
import Vue from 'vue'
import template from './acceptance.html'

const comp = {
    name: 'acceptance',
    template,
    data: function() {
        return {
            state: {
                newAc: '',
                session: store.state.session,
                error: ''
            }
        }
    },
    methods: {
        navigateTo: function(nav) {
            this.$router.go({
                path: nav
            })
        },
        addCriteria: function(ac) {
            if (ac && ac.length > 0) {
                store.commit('acceptance', ac)
            }

            const element = document.getElementById('newAc')
            if (element) {
                element.focus()
            }
            const acs = store.state.session.story.acs
            return {
                newAc: '',
                acs,
                error: ''
            }
        },
        removeCriteria: function(acNo) {
            store.commit('removeAcceptance', acNo)
            const acs = store.state.session.story.acs
            return {
                newAc: '',
                acs,
                error: ''
            }
        }

    }
}
Vue.component('acceptance', comp)
export default comp
