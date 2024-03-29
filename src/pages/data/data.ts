import Vue from "vue";

import store from "../../store";
import beforeCreate from "../../loginCheck";

import user from "../../user";
import "./data.css";

import "./current/current.vue";
import "./hours/hours.vue";
import "./skills/skills.vue";

const comp = {
  name: "rawdata",
  beforeCreate,
  create: () => {
    const user = <any>comp.data().session.user;
    user.picked = true;
  },
  data: () => {
    const keys = Object.keys(store.state.session);
    return {
      session: store.state.session,
      menu: store.state.menu,
      keys
    };
  },
  methods: {
    save: () => {
      const session = <any>store.state.session;
      user.updateUser(session.user, session.project);
    }
  }
};

Vue.component("rawdata", comp);
export default comp;
