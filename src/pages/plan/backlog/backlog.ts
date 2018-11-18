import Vue from "vue";

import "./backlog.css";
// import '../../../../node_modules/vue-material/dist/components/mdList/index.css'

import store from "../../../store.js";
import user from "../../../user.js";

import util from "./../util.js";

const comp = {
  name: "backlog",
  data: () => {
    return {
      session: store.state.session,
      project: store.state.session.project,
      colourClasses: store.state.defaults.colourClasses
    };
  },
  computed: {
    complete: {
      get: function() {
        const state = util.backlogState(this.project);
        return state.complete;
      },
      set: function(what) {
        console.log("complete set to ", what);
      }
    }
  },
  beforeCreate: function() {
    const state = util.backlogState(store.state.session.project);
    this.complete = state.complete;
  },
  methods: {
    save: () => {
      const session = store.state.session;
      user.updateUser(session.user, session.project);
    },
    newTask: i => {
      console.log("story selected is number " + i);
      store.commit("clearTask");
      store.commit("selectStory", i);
      store.commit("planState", "task");
    },
    refine: () => {
      window.location.href = "#/refine";
    },
    selectTask: (i, task) => {
      console.log("story selected is number " + i);
      console.log("task selected...");
      console.log(task);
      store.commit("selectStory", i);
      store.commit("selectTask", task);
      store.commit("planState", "task");
    },
    addToSprint: function(index) {
      store.commit("addToSprint", index);
      util.updateSprints();
      store.commit("planState", "sprint");
    },
    completeStories: function() {
      const state = util.backlogState(store.state.session.project);
      return state.complete;
    }
  }
};

Vue.component("backlog", comp);
export default comp;
