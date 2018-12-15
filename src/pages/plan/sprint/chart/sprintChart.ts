import Vue from "vue";

import { Bar } from "vue-chartjs";

import store from "../../../../store";

import { SkillService } from "./skills.js";

const generate = (sprint:any) => {
  const sprintSkills = SkillService.sprintSkills(sprint);
  return {
    labels: Object.keys(sprintSkills),
    datasets: Object.values(sprintSkills)
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
      handler: function(sess:any) {
        const sprint = sess.project.sprints[sess.project.current.sprintIndex];
        const data = generate(sprint);
        const that = <any> this;
        that._chart.data.datasets = [
          {
            label: "Sprint",
            backgroundColor: "#f87979",
            data: data.datasets
          }
        ];
        that._chart.data.labels = data.labels;
        that._chart.update();
      },
      deep: true
    }
  },
  mounted() {
    const project = store.state.session.project;
    console.log("The project is %o", project);
    const sprint =
      project.sprints[store.state.session.project.current.sprintIndex];
    const data = generate(sprint);
    const that = <any> this;
    that.renderChart({
      labels: data.labels,
      datasets: [
        {
          label: "Sprint",
          backgroundColor: "#f87979",
          data: data.datasets
        }
      ]
    });
  }
};

Vue.component("sprintChart", comp);
export default comp;