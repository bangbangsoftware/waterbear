import store from "../../store";
import Vue from "vue";

import "../story/tags/tags.vue";
import "../story/colours/colours.vue";
import "../story/acceptance/acceptance.vue";
import "../story/desc/desc.vue";
import valid from "../story/valid";

import check from "../../loginCheck";
import util from "../plan/util";

const jumpIncomplete = (project:any, amount:number) => {
  const state = comp.methods.backlogState(project);
  const lastIndex = state.incomplete.length - 1;

  if (state.incomplete.length === 0) {
    console.log("All stories are complete!");
    return;
  }
  if (state.incomplete.length === 1) {
    console.log("Only one incomplete story");
    store.commit("incomplete", 0);
    return;
  }
  const session = <any> store.state.session;
  if (session.incomplete === undefined) {
    console.log("Setting incomplete index is missing, setting it to zero");
    store.commit("incomplete", 0);
    return state.incomplete[session.incomplete];
  }

  store.commit("incomplete", session.incomplete + amount);
  if (session.incomplete > lastIndex) {
    console.log("Incomplete index out of bounds, setting back to zero");
    store.commit("incomplete", 0);
    return state.incomplete[session.incomplete];
  }

  if (session.incomplete < -1) {
    console.log("Incomplete index less than zero, setting back to end");
    store.commit("incomplete", lastIndex);
    return state.incomplete[session.incomplete];
  }
  const next = state.incomplete[session.incomplete];
  return next;
};

const jump = (project:any, amount:number) => {
  const current = jumpIncomplete(project, amount);
  if (current === undefined) {
    return;
  }
  store.commit("currentStory", current);
  console.log("Story is now....");
  console.log(store.state.session.story.title);
  console.log(store.state.session.story);
  return current;
};

const comp = {
  name: "refine",
  beforeCreate: function() {
    check();
    comp.methods.startIncomplete(store.state.session.project);
  },
  data: function() {
    return {
      session: store.state.session
    };
  },
  methods: {
    selectStory: function(story:any) {
      store.commit("story", story);
    },
    updateStory: function(story:any) {
      var ok = valid(story);
      if (!ok) {
        console.log("invalid story...");
        console.log(story);
        return;
      }
      console.log("posting Story");
      store.commit("postStory");
      const prj = store.state.session.project;
      console.log("Adding stories to..");
      console.log(prj);
      const db = store.state.db;
      db.get(prj._id)
        .then((p:any) => {
          p.stories = prj.stories;
          return db.put(p);
        })
        .catch((err:any) => console.error(err))
        .then(() => this.startIncomplete(prj));
    },
    whatsNeeded: function(story:any) {
      valid(story);
    },
    startIncomplete: function(project:any) {
      const state = this.backlogState(project);
      if (state.incomplete.length === 0) {
        console.log("All stories are complete!");
        return;
      }
      store.commit("incomplete", 0);
      const session = <any> store.state.session;
      const first = state.incomplete[session.incomplete];
      store.commit("currentStory", first);
      return first;
    },
    lastIncomplete: function(project:any) {
      return jump(project, -1);
    },
    nextIncomplete: function(project:any) {
      return jump(project, 1);
    },
    todo: function(project:any) {
      const states = this.backlogState(project);
      return states.incomplete.length;
    },
    backlogState: function(project:any) {
      return util.backlogState(project);
    },
    navigateTo: function(nav:string) {
      const that = <any> this;
      that.$router.go({
        path: nav
      });
    }
  }
};

Vue.component("refine", comp);

export default comp;
