import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'
import store from 'store'

const comp = Bar.extend({
   data: () => {
      return {
         session: store.state.session
      }
   },
   watch: {
      session: {
         handler: function(val) {
            const graph = val.planChartData.spareSkills
            this._chart.data.datasets = [{
               label: 'spare',
               backgroundColor: '#180079',
               data: graph.gots
            }]
            this._chart.data.labels = graph.skills
            this._chart.update()
         },
         deep: true
      }
   },
   mounted() {
      const display = store.state.session.planChartData.spareSkills
      this.renderChart({
         labels: display.skills,
         datasets: [{
            label: 'spare',
            backgroundColor: '#180079',
            data: display.gots
         }]
      })
   }
})

Vue.component('spareChart', comp)
export default comp
