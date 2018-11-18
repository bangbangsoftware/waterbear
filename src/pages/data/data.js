import Vue from "vue";

import store from "../../store.js";
import beforeCreate from "../../loginCheck.js";

import user from "../../user.js";
import "./data.css";

import "./current/current.vue";
import "./hours/hours.vue";
import "./skills/skills.vue";

const comp = {
  name: "rawdata",
  beforeCreate,
  create: () => {
    comp.data().session.user.picked = true;
  },
  data: () => {
    console.log(store.state);
    const keys = Object.keys(store.state.session);
    return {
      session: store.state.session,
      menu: store.state.menu,
      keys
    };
  },
  methods: {
    save: () => {
      const session = store.state.session;
      user.updateUser(session.user, session.project);
    }
  }
};

Vue.component("rawdata", comp);
export default comp;
