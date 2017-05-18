import Vue from 'vue'

import template from './sprint.html'

import store from '../../../store.js'

const comp = {
   name: 'sprint',
   template,
   data: () => {
      return {
         project: store.state.session.project,
         session: store.state.session,
         sprint: store.state.session.project.sprints[store.state.session.sprintIndex]
      }
   },
   methods: {
      deselect: () => {
         store.commit('selectSprint', -1)
         store.commit('planState', 'sprintSelect')
      },
      removeFromSprint: (story, index) => {
         store.commit('takeFromSprint', index)
         // storeSprints()
      }
   }
}

Vue.component('sprint', comp)
export default comp
