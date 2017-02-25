import store from '../../../store.js'
import template from './summary.html'
import Vue from 'vue'

const comp = {
   name: 'projectSummary',
   template,
   data() {
      return {
         project: store.state.project,
         members: store.state.members
      }
   }
}

Vue.component('projectSummary', comp)
