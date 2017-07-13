import Vue from 'vue'

import store from '../../../store.js'

import template from './sprint.html'

import next from '../next.js'

import loginCheck from '../../../loginCheck.js'

import './chart/memberChart.js'
import './chart/sprintChart.js'
import './chart/balanceChart.js'

const comp = {
   name: 'sprint',
   beforeCreate: function() {
      loginCheck().then(() => {
         const id = parseInt(this.$route.params.id)
         console.log(new Date() + ' sprint planning -#' + id)
         store.commit('selectSprint', id)
         store.commit('planState', 'sprint')
         store.commit('sprintSkills')
         const state = next(store.state.session)
         store.commit('planState', state)
      })
   },
   template,
   data: () => {
      return {
         session: store.state.session
      }
   },
   methods: {}
}

Vue.component('sprint', comp)

export default comp
