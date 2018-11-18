import store from "../../store.js";

import Vue from "vue";

import "./start/start.vue";
import "./project/project.vue";
import "./summary/summary.vue";
import "./owner/owner.vue";
import "./team/team.vue";

const comp = {
  name: "signup",
  data: function() {
    return {
      stages: store.state.signup.stages,
      signup: {
        error: "",
        stage: "start"
      }
    };
  }
};

Vue.component("signup", comp);

export default comp;
