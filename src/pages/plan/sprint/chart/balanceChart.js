import Vue from 'vue'

import {
   Bar,
   mixins
} from 'vue-chartjs'

import store from '../../../../store.js'

const generate = data => {
   return {
      labels: data.skills,
      datasets: [{
         label: 'Need',
         backgroundColor: '#f87797',
         data: data.needs
      }, {
         label: 'Got',
         backgroundColor: '#180097',
         data: data.gots
      }]
   }
}

let graph = {}

const comp = Bar.extend({
   mixins: [mixins.reactiveProp],
   props: ['graphData'],
   data: () => {
      return {
         session: store.state.session
      }
   },
   watch: {
      session: {
         handler: function(val) {
            graph = generate(this.session.planChartData.balance)
            this._chart.data.datasets = graph.datasets // [0].data[2] = 100
            this._chart.data.labels = graph.labels // [0].data[2] = 100
            this._chart.update()
         },
         deep: true
      }
   },
   mounted() {
      graph = generate(this.graphData)
      this.renderChart(graph, {
         responsive: true,
         maintainAspectRatio: false
      })
   }
})

Vue.component('balanceChart', comp)
export default comp
