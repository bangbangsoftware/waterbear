import Vue from 'vue'

import { Bar } from 'vue-chartjs'
import store from 'store'

const comp = Bar.extend({
   mounted() {
      const display = store.state.session.planChartData.balance
      console.log('display', display)
      this.renderChart({
         labels: display.skills,
         datasets: [{
            label: 'Need',
            backgroundColor: '#f87979',
            data: display.needs
         }, {
            label: 'Got',
            backgroundColor: '#180079',
            data: display.gots
         }]
      })
   }
})

Vue.component('balanceChart', comp)
export default comp
