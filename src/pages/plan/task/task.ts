import Vue from "vue";

import store from "../../../store.js";

import valid from "./valid";
import util from "../util.js";

import "./task.css";

const comp = {
  name: "task",
  beforeCreate: () => {
    if (!store.state.session.task) {
      store.commit("clearTask");
    }
  },
  data: () => {
    return {
      session: store.state.session,
      skills: store.state.defaults.skills,
      newSkill: "Add skill"
    };
  },
  methods: {
    storeTask: (task: any) => util.storeTask(task),
    storeName: (value: string) => store.commit("taskName", value),
    storeDesc: (desc: string) => store.commit("taskDesc", desc),
    storeSkill: (value: string) => store.commit("taskSkill", value),
    storeEst: (value: string) => {
      const num = parseInt(value);
      store.commit("taskEst", num);
    },
    postTask: function(task: any) {
      var ok = valid(task);
      if (!ok) {
        console.log("invalid task...");
        console.log(task);
        return;
      }
      console.log("posting task");
      store.commit("task", task);
      comp.methods.storeTask(task);
    },
    exit: function() {
      const that = <any>this;
      const state = util.next(that.session);
      store.commit("planState", state);
    }
  }
};

Vue.component("task", comp);
export default comp;
