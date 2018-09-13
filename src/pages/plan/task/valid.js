import store from "../../../store";

const service = task => {
  if (task.name.length === 0) {
    store.commit("taskError", "invalid task - missing name");
    return false;
  }

  if (task.desc.length === 0) {
    store.commit("taskError", "invalid task - missing description");
    return false;
  }

  if (task.skill.length === 0) {
    store.commit("taskError", "invalid task - missing skill");
    return false;
  }

  if (task.est === 0) {
    store.commit("taskError", "invalid task - missing time estimation");
    return false;
  }

  store.commit("taskOk");
  return true;
};

export default service;
