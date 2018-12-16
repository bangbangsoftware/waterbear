import Vue from "vue";

import { Bar } from "vue-chartjs";
import store from "../../../../store";

const generate = (data:any) => {
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
        const that = <any> this;
        const graph = generate(that.session.planChartData.balance);
        that._chart.data.datasets = graph.datasets;
        that._chart.data.labels = graph.labels;
        that._chart.update();
      },
      deep: true
    }
  },
  mounted() {
    const that = <any> this;
    const session = <any> store.state.session;
    const graph = generate(session.planChartData.balance);
    that.renderChart(graph, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
};

Vue.component("balanceChart", comp);
export default comp;
