// import router from './router/index.js'
import store from "./store.js";
import db from "./dbase.js";
import userService from "./user.js";
import director from "./director.js";
import state from "./persist/state.js";

const register = (user, project, resolve) => {
  console.log("Found...", project, "For...", user);
  store.commit("project", project);
  store.commit("log", user.name + " logged on");
  store.commit("log", "entering project " + project._id);

  const projectsUser = userService.loadUser(user, project);
  store.commit("user", projectsUser);
  whereNow(project, projectsUser, resolve);
};

const whereNow = (project, user, resolve) => {
  const next = director(user, project);
  resolve(next);
};

const unfoundProject = (me, err, resolve) => {
  console.error('Cannot find "' + me.currentProject + '".');
  console.error(err);
  resolve("start/" + me.currentProject);
};

const goProject = (me, resolve, reject) => {
  state
    .load(me.currentProject)
    .then(p => register(me, p, resolve, reject))
    .catch(err => unfoundProject(me, err, resolve));
};

const goodUser = (user, resolve, reject) => {
  if (typeof user.currentProject === "undefined") {
    store.commit("error", "Need to define a project");
    resolve("start");
  } else {
    goProject(user, resolve, reject);
  }
};

const badUser = (error, reject) => {
  console.error(error);
  reject(error);
};

const loadUser = (me, resolve, reject) => {
  state
    .getUser(me.name)
    .then(user => goodUser(user, resolve, reject))
    .catch(error => badUser(error, reject));
};

const service = (me, database = db) => {
  store.commit("db", database);
  return new Promise((resolve, reject) => {
    console.log(me);
    if (me.currentProject === undefined) {
      loadUser(me, resolve, reject);
    } else {
      goProject(me, resolve, reject);
    }
  });
};

export default service;
