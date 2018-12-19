import Vue from "vue";

import { Bar } from "vue-chartjs";
import store from "../../../../store";

const comp = {
  extends: Bar,
  data: () => {
    return {
      session: store.state.session
    };
  },
  watch: {
    session: {
      handler: function(val: any) {
        const graph = val.planChartData.spareSkills;
        const that: any = this;
        that._chart.data.datasets = [
          {
            label: "spare",
            backgroundColor: "#180079",
            data: graph.gots
          }
        ];
        that._chart.data.labels = graph.skills;
        that._chart.update();
      },
      deep: true
    }
  },
  mounted() {
    const session: any = store.state.session;
    const that: any = this;
    const display = session.planChartData.spareSkills;
    that.renderChart(
      {
        labels: display.skills,
        datasets: [
          {
            label: "spare",
            backgroundColor: "#180079",
            data: display.gots
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};

Vue.component("spareChart", comp);
export default comp;
