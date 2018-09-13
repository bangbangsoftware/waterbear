import Vue from "vue";

import { Bar } from "vue-chartjs";
import store from "../../../../store.js";

const generate = data => {
  return {
    labels: data.skills,
    datasets: [
      {
        label: "Need",
        backgroundColor: "#f87797",
        data: data.needs
      },
      {
        label: "Got",
        backgroundColor: "#180097",
        data: data.gots
      }
    ]
  };
};

const comp = {
  extends: Bar,
  data: () => {
    return {
      session: store.state.session
    };
  },
  watch: {
    session: {
      handler: function() {
        const graph = generate(this.session.planChartData.balance);
        this._chart.data.datasets = graph.datasets;
        this._chart.data.labels = graph.labels;
        this._chart.update();
      },
      deep: true
    }
  },
  mounted() {
    const graph = generate(store.state.session.planChartData.balance);
    this.renderChart(graph, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
};

Vue.component("balanceChart", comp);
export default comp;
