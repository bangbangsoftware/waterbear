import store from "../../../store";

export default {
  addToSprint: (state: any, index: number) => {
    let sprint = state.session.project.sprints
      ? state.session.project.sprints[state.session.project.current.sprintIndex]
      : false;
    const story = state.session.project.stories.splice(index, 1)[0];
    if (!sprint) {
      sprint = {
        name: "unnamed",
        list: []
      };
    }
    state.session.project.sprints = state.session.project.sprints
      ? state.session.project.sprints
      : [];
    if (!sprint.list) {
      sprint.list = [];
    }
    sprint.list.push(story);
    state.session.project.sprints[
      state.session.project.current.sprintIndex
    ] = sprint;
    store.commit("log", 'Added a task to  "' + sprint.name + '" sprint."');
  }
};
