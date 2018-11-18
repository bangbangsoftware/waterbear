import Vue from "vue";

import store from "../../../store.js";
import user from "../../../user.js";

import template from "./team.html";

const comp = {
  name: "team-display",
  template,
  beforeCreate: function() {
    this.members = store.state.session.project.members;
  },
  data: () => {
    return {
      session: store.state.session,
      members: []
    };
  },
  methods: {
    save: () => {
      const session = store.state.session;
      user.updateUser(session.user, session.project);
    }
  }
};

Vue.component("team-display", comp);
export default comp;
