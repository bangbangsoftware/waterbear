import Vue from 'vue'

import { Bar } from 'vue-chartjs'
import data from './data.js'

const comp = Bar.extend({
   mounted() {
      const both = data.refresh()
      const display = both.balance
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
