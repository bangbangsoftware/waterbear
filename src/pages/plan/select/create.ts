import Vue from "vue";

import store from "../../../store";
import util from "../util";

const storeSprint = (sprint: any) => {
  const prj = store.state.session.project;
  console.log("Adding sprint to project");
  console.log(prj);
  const db = store.state.db;
  db.get(prj._id)
    .then((p: any) => {
      let sprints = p.sprints;
      if (!sprints) {
        sprints = [];
      }
      sprints.push(sprint);
      p.sprints = sprints;
      return db.put(p);
    })
    .catch((err: any) => console.error(err));
};

const comp = {
  name: "sprint-create",
  data: () => {
    return {
      session: store.state.session,
      sprint: store.state.session.sprint
    };
  },
  methods: {
    storeName: (name: string) => {
      store.commit("sprintName", name);
    },
    storeDays: (days: Array<any>) => {
      store.commit("sprintDays", days);
    },
    changeState: function() {
      console.log("Change from state from create");
      const state = util.next(store.state.session);
      store.commit("planState", state);
    },
    postSprint: () => {
      store.commit("postSprint", store.state.session.sprint);
      storeSprint(store.state.session.sprint);
      const state = util.next(store.state.session);
      store.commit("planState", state);
    }
  }
};

Vue.component("sprint-create", comp);
export default comp;
