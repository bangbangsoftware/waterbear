import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'

import store from 'store'

import skills from './skills.js'

const comp = Bar.extend({
   mounted() {
      const project = store.state.session.project
      console.log('The project is %o', project)
      const sprint = project.sprints[store.state.session.sprintIndex]
      const sprintSkills = skills.sprintSkills(sprint)
      this.renderChart({
         labels: Object.keys(sprintSkills),
         datasets: [{
            label: 'Sprint',
            backgroundColor: '#f87979',
            data: Object.values(sprintSkills)
         }]
      })
   }
})

Vue.component('sprintChart', comp)
export default comp
