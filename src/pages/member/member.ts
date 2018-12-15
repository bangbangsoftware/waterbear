import Vue from "vue";

import store from "../../store.js";
import beforeCreate from "../../loginCheck.js";

import user from "../../user.js";
import "./member.css";

import "./name/name.vue";
import "./hours/hours.vue";
import "./skills/skills.vue";

const comp = {
  name: "member",
  beforeCreate,
  create: () => {
    const user = <any>comp.data().session.user
    user.picked = true;
  },
  data: () => {
    return {
      session: store.state.session,
      menu: store.state.menu
    };
  },
  methods: {
    save: () => {
      const session = <any> store.state.session;
      user.updateUser(session.user, session.project);
    }
  }
};

Vue.component("member", comp);
export default comp;
