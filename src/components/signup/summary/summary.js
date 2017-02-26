import store from '../../../store.js'
import template from './summary.html'
import Vue from 'vue'

const comp = {
   name: 'projectSummary',
   template,
   data() {
      return {
         stages: store.state.signup.stages,
         members: store.state.members
      }
   }
}

Vue.component('projectSummary', comp)
