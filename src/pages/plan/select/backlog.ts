import Vue from "vue";

import store from "../../../store";

const comp = {
  name: "sprint-backlog",
  data: () => {
    return {
      project: store.state.session.project,
      session: store.state.session
    };
  },
  methods: {
    selectSprint: (i:number) => {
      console.log("sprint selected is number " + i);
      if (window) {
        Vue.nextTick(() => {
          window.location.href = "#/sprint/" + i;
        });
      }
    },
    newSprint: () => {
      store.commit("planState", "sprintCreate");
    }
  }
};

Vue.component("sprint-backlog", comp);
export default comp;
