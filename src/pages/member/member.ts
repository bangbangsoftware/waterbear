import Vue from "vue";

import store from "../../store";
import beforeCreate from "../../loginCheck";

import user from "../../user";
import "./member.css";

import "./name/name.vue";
import "./hours/hours.vue";
import "./skills/skills.vue";
import { Member, Session } from "@/waterbear3";

import state from "../../persist/state";

const comp = {
  name: "member",
  beforeCreate,
  create: () => {
    const user = <Member>comp.data().session.user;
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
      const session = <Session>store.state.session;
      user.updateUser(session.user, session.project);
      state.save(session.project);
    }
  }
};

Vue.component("member", comp);
export default comp;
