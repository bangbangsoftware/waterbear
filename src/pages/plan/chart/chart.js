import Vue from 'vue'

import { Bar } from 'vue-chartjs'

import store from 'store'

const comp = Bar.extend({
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: store.state.session.skills,
          //  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Skills',
          backgroundColor: '#f87979',
          data: [10, 1, 2, 9, 1, 4, 3, 8, 4, 2, 1, 1]
        }
      ]
    })
  }
})

Vue.component('chart', comp)
export default comp
