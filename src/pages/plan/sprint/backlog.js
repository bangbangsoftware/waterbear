import Vue from 'vue'

import template from './backlog.html'

import store from '../../../store.js'

const comp = {
   name: 'sprint-backlog',
   template,
   data: () => {
      return {
         project: store.state.session.project
      }
   },
   methods: {
      selectSprint: (i) => {
         console.log('sprint selected is number ' + i)
         store.commit('selectSprint', i)
         store.commit('planState', 'sprint')
      }
   }
}

Vue.component('sprint-backlog', comp)
export default comp
