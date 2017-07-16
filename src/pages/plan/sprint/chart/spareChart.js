import Vue from 'vue'

import { Bar } from 'vue-chartjs'
import store from 'store'

const comp = Bar.extend({
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
