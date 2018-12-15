import validSprint from "./valid.js";
import store from "../../../store.js";

export default {
  selectSprint: (state:any, i:number) => {
    state.session.project.current.sprintIndex = i;
  },
  sprintName: (state:any, newState:string) => {
    state.session.sprint.name = newState;
    validSprint(state.session.sprint);
  },
  sprintDays: (state:any, newState:any) => {
    if (!newState) {
      return;
    }
    state.session.sprint.days =
      typeof newState === "string" ? parseInt(newState) : newState;
    validSprint(state.session.sprint);
  },
  sprintError: (state:any, message:string) => {
    state.session.sprint.error = message;
    state.session.sprint.valid = false;
  },
  sprintOk: (state:any) => {
    state.session.sprint.error = "";
    state.session.sprint.valid = true;
  },
  postSprint: (state:any, sprint:any) => {
    if (!state.session.project.sprints) {
      state.session.project.sprints = [];
    }
    state.session.project.sprints.push(sprint);
  },
  takeFromSprint: (state:any, index:number) => {
    let sprint =
      state.session.project.sprints[state.session.project.current.sprintIndex];
    const story = sprint.list.splice(index, 1)[0];
    story.index = -1;
    state.session.project.stories.push(story);
    state.session.project.sprints[
      state.session.project.current.sprintIndex
    ] = sprint;
    store.commit("log", 'Task removed from "' + sprint.name + '" sprint."');
  }
};
