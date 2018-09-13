import Vuex from "vuex";
import Vue from "vue";

import mutations from "./storeMutations.js";
import taskMutations from "./pages/plan/task/taskStore.js";
import memberMutations from "./pages/member/memberStore.js";
import storyMutations from "./pages/story/storyStore.js";
import backlogMutations from "./pages/plan/backlog/backlogStore.js";
import planMutations from "./pages/plan/planStore.js";
import sprintMutations from "./pages/plan/select/selectStore.js";
import chartMutations from "./pages/plan/sprint/chart/chartStore.js";
import refineMutations from "./pages/refine/refineStore.js";

import state from "./storeState.js";

Vue.use(Vuex);

const addToMutations = newMutes => {
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
