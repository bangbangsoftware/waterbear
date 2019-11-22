import Vuex from "vuex";
import Vue from "vue";

//import mutations from "./storeMutations";
import taskMutations from "./pages/plan/task/taskStore";
import memberMutations from "./pages/member/memberStore";
import storyMutations from "./pages/story/storyStore";
import backlogMutations from "./pages/plan/backlog/backlogStore";
import planMutations from "./pages/plan/planStore";
import sprintMutations from "./pages/plan/select/selectStore";
import chartMutations from "./pages/plan/sprint/chart/chartStore";
import refineMutations from "./pages/refine/refineStore";

import state from "./storeState";
import { Member, State, Project, Database } from "@/waterbear3";

Vue.use(Vuex);

const mutations: any = {
  loaded: (state: State, l: boolean) => {
    console.log("Loaded? " + l);
    state.session.loaded = l;
  },
  stage: (state: State, newStage: string) => {
    state.signup.stages.push(newStage);
  },
  db: (state: State, database: Database) => {
    state.db = database;
  },
  error: (state: State, error: string) => {
    console.log("session now has this error:" + error);
    state.session.error = error;
  },
  project: (state: State, prj: Project) => {
    state.session.project = prj;
  },
  user: (state: State, user: Member) => {
    state.session.user = user;
  },
  log: (state: State, message: string) => {
    const item = {
      date: new Date(),
      message
    };
    state.feeds.push(item);
  }
};

const addToMutations = (newMutes: any) => {
  for (let key in newMutes) {
    mutations[key] = newMutes[key];
  }
};
addToMutations(memberMutations);
addToMutations(storyMutations);
addToMutations(taskMutations);
addToMutations(backlogMutations);
addToMutations(planMutations);
addToMutations(sprintMutations);
addToMutations(chartMutations);
addToMutations(refineMutations);

const getters = {
  user: (user: any) => state.session.user
};

const store = new Vuex.Store({
  state,
  mutations,
  getters
});
console.log(store.getters.user);
export default store;
