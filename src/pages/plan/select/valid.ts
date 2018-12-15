import store from "../../../store.js";

const service = (sprint:any) => {
  if (!sprint.name || sprint.name.length === 0) {
    store.commit("sprintError", "invalid sprint - missing name");
    return false;
  }

  const number = parseInt(sprint.days);
  if (!sprint.days || sprint.days.length === 0 || number < 1) {
    store.commit("sprintError", "invalid sprint - missing sprint length");
    return false;
  }

  store.commit("sprintOk");
  return true;
};

export default service;
