import store from "../../../../store.js";
import Vue from "vue";
import check from "../../../../loginCheck.js";

import sprintState from "../../../../common/stats/sprintStat.js";

const currentSprint = session => {
  const spt = session.project.sprints[session.project.current.sprintIndex];
  spt.defined = true;
  return spt;
};

const comp = {
  name: "condition",
  beforeCreate: function() {
    check();
  },
  data: function() {
    const session = store.state.session;
    const project = session.project;
    const members = session.project.members;
    const sprint = currentSprint(session);
    const stat = sprintState.contingency(sprint, members);
    const todo = sprintState.taskToDo(sprint);
    return {
      session,
      project,
      sprint,
      stat,
      todo
    };
  },
  methods: {}
};

Vue.component("condition", comp);

export default comp;
