import Vue from "vue";

import store from "../../store";
import loginCheck from "../../loginCheck";
import util from "./util";

import task from "./task/task.vue";
import backlog from "./backlog/backlog.vue";
import selectSprint from "./select/select.vue";
import sprintBacklog from "./select/backlog.vue";
import sprintCreate from "./select/create.vue";
import teamDisplay from "../team/team.vue";

console.log(" CURRENTLY pages/plan/plan.ts THIS IS NOT USED?!");

const comp = {
  components: {
    task,
    backlog,
    selectSprint,
    sprintBacklog,
    sprintCreate,
    teamDisplay
  },
  name: "plan",
  beforeCreate: () => {
    console.log(new Date() + " Plan created");
    loginCheck().then(() => {
      const state = util.next(store.state.session);
      console.log("Where we at? " + state);
      store.commit("planState", state);
    });
  },
  data: () => {
    return {
      session: store.state.session
    };
  },
  watch: {
    session: function(val:any) {
      this.session = val;
    }
  },
  methods: {}
};

Vue.component("plan", comp);

export default comp;
