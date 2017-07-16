import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'

import store from 'store'

import skills from './skills.js'

const generate = sprint => {
   const sprintSkills = skills.sprintSkills(sprint)
   return {
      labels: Object.keys(sprintSkills),
      datasets: Object.values(sprintSkills)
   }
}

const comp = Bar.extend({
   watch: {
      session: {
         handler: function(val) {
            const sprint = store.state.session.project.sprints[store.state.session.sprintIndex]
            const data = generate(sprint)
            this._chart.data.datasets = data.datasets
            this._chart.data.labels = data.labels
            this._chart.update()
         },
         deep: true
      }
   },
   mounted() {
      const project = store.state.session.project
      console.log('The project is %o', project)
      const sprint = project.sprints[store.state.session.sprintIndex]
      const data = generate(sprint)
      this.renderChart({
         labels: data.labels,
         datasets: [{
            label: 'Sprint',
            backgroundColor: '#f87979',
            data: data.datasets
         }]
      })
   }
})

Vue.component('sprintChart', comp)
export default comp
