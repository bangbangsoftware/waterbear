import validTask from "./valid.js";
import store from "../../../store.js";

export default {
  taskError: (state, message) => {
    state.session.task.error = message;
    state.session.task.valid = false;
  },
  taskOk: state => {
    state.session.task.error = "";
    state.session.task.valid = true;
  },
  clearTask: state => {
    state.session.task = {
      error: "",
      name: "",
      desc: "",
      skill: "",
      est: 0,
      valid: false
    };
  },
  taskName: (state, name) => {
    state.session.task.name = name;
    validTask(state.session.task);
  },
  taskDesc: (state, desc) => {
    state.session.task.desc = desc;
    validTask(state.session.task);
  },
  taskSkill: (state, skill) => {
    state.session.task.skill = skill;
    validTask(state.session.task);
  },
  taskEst: (state, est) => {
    state.session.task.est = est;
    validTask(state.session.task);
  },
  selectTask: (state, task) => {
    state.session.task = task;
    validTask(state.session.task);
  },
  task: (state, task) => {
    const project = state.session.project;
    const stories = project.stories;
    const storyIndex = state.session.story.index;
    const story = stories[storyIndex];
    let tasks = [];
    if (story && story.tasks) {
      tasks = story.tasks.filter(t => t.name !== task.name);
    } else {
      task.index = tasks.length;
    }
    tasks.push(task);
    if (story) {
      state.session.project.stories[storyIndex].tasks = tasks;
      store.commit(
        "log",
        'Added "' + task.name + '" to story "' + story.title + '"'
      );
    } else {
      console.error("No story when storing task???");
    }
    store.commit("clearTask");
  },
  sprintTask: (state, task) => {
    const project = state.session.project;
    const sprint = project.sprints[project.current.sprintIndex];
    const storyList = sprint.list.filter(
      story => story.index === task.storyIndex
    );
    if (storyList.length !== 1) {
      console.error(storyList.length + " Cannot find story for ", task);
      return;
    }
    const story = storyList[0];
    const tasks = story.tasks.filter(t => t.index !== task.index);
    tasks.push(task);
    story.tasks = tasks;
  }
};
