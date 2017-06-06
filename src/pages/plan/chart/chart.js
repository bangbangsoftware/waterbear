import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'

import store from 'store'

const comp = Bar.extend({
   mounted() {
      // Overwriting base render method with actual data.
      this.renderChart({
         labels: Object.keys(store.state.session.skills),
         datasets: [{
            label: 'Skills',
            backgroundColor: '#f87979',
            data: Object.values(store.state.session.skills)
         }]
      })
   }
})

Vue.component('chart', comp)
export default comp
