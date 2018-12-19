import Vue from "vue";

import store from "../../../store.js";
import user from "../../../user.js";

const comp = {
  name: "team-display",
  beforeCreate: function() {
    const that = <any>this;
    that.members = store.state.session.project.members;
  },
  data: () => {
    return {
      session: store.state.session,
      members: []
    };
  },
  methods: {
    save: () => {
      const session = <any>store.state.session;
      user.updateUser(session.user, session.project);
    }
  }
};

Vue.component("team-display", comp);
export default comp;
