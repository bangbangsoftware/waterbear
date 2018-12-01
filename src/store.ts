import Vuex from "vuex";
import Vue from "vue";

//import mutations from "./storeMutations";
import {Member} from './user/member';
import taskMutations from "./pages/plan/task/taskStore";
import memberMutations from "./pages/member/memberStore";
import storyMutations from "./pages/story/storyStore";
import backlogMutations from "./pages/plan/backlog/backlogStore";
import planMutations from "./pages/plan/planStore";
import sprintMutations from "./pages/plan/select/selectStore";
import chartMutations from "./pages/plan/sprint/chart/chartStore";
import refineMutations from "./pages/refine/refineStore";

import state from "./storeState";

Vue.use(Vuex);

const mutations:any = {
  loaded: (state: any, l: boolean) => {
    console.log('Loaded? ' + l);
    state.session.loaded = l;
  },
  stage: (state: any, newStage: any) => {
    state.signup.stages.push(newStage);
  },
  db: (state: any, database: any) => {
    state.db = database;
  },
  error: (state: any, error: any) => {
    console.log('session now has this error:' + error);
    state.session.error = error;
  },
  project: (state: any, prj: any) => {
    state.session.project = prj;
  },
  user: (state: any, user: Member) => {
    state.session.user = user;
  },
  log: (state: any, message: string) => {
    const item = {
      date: new Date(),
      message,
    };
    state.feeds.push(item);
  },
};

const addToMutations = (newMutes:any) => {
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

export default new Vuex.Store({
  state,
  mutations
});
