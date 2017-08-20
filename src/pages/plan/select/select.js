import Vue from 'vue'

import template from './select.html'
import './select.css'

import store from '../../../store.js'
import util from '../util.js'

const comp = {
   name: 'selectSprint',
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
         util.updateSprints()
      }
   }
}

Vue.component('selectSprint', comp)
export default comp
