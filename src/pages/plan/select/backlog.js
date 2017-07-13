import Vue from 'vue'

import template from './backlog.html'

import store from '../../../store.js'

const comp = {
   name: 'sprint-backlog',
   template,
   data: () => {
      return {
         project: store.state.session.project,
         session: store.state.session
      }
   },
   methods: {
      selectSprint: (i) => {
         console.log('sprint selected is number ' + i)
        if (window) {
            Vue.nextTick(() => {
               window.location.href = '#/sprint/' + i
            })
         }
      },
      newSprint: () => {
         store.commit('planState', 'sprintCreate')
      }
   }
}

Vue.component('sprint-backlog', comp)
export default comp
