// import router from './router/index.js'
import store from "./store";
import db from "./dbase";
import userService from "./user";
import { Member } from "./user/member";
import director from "./director";
import state from "./persist/state";

const register = (user: Member, project: any, resolve: any) => {
  console.log("Found...", project, "For...", user);
  store.commit("project", project);
  store.commit("log", user.name + " logged on");
  store.commit("log", "entering project " + project._id);

  const projectsUser = userService.loadUser(user, project);
  store.commit("user", projectsUser);
  whereNow(project, projectsUser, resolve);
};

const whereNow = (project: any, user: Member, resolve: any) => {
  const next = director(user, project);
  resolve(next);
};

const unfoundProject = (me: Member, err: any, resolve: any) => {
  console.error('Cannot find "' + me.currentProject + '".');
  console.error(err);
  resolve("start/" + me.currentProject);
};

const goProject = (me: Member, resolve: any, reject: any) => {
  state
    .load(me.currentProject)
    .then((p: any) => register(me, p, resolve))
    .catch((err: any) => unfoundProject(me, err, resolve));
};

const goodUser = (user: Member, resolve: any, reject: any) => {
  if (typeof user.currentProject === "undefined") {
    store.commit("error", "Need to define a project");
    resolve("start");
  } else {
    goProject(user, resolve, reject);
  }
};

const badUser = (error: any, reject: any) => {
  console.error(error);
  reject(error);
};

const empty = (what: Object | null): boolean => {
  if (what! || what === null || what === undefined) {
    return true;
  }
  const keys = Object.keys(store.state.db);
  if (keys && keys.length === 1 && keys[0] === "put") {
    return true;
  }
  return false;
};

const loadUser = (me: Member, resolve: any, reject: any) => {
  console.log("loadUser", me);
  state
    .getUser(me.name)
    .then((user: Member) => goodUser(user, resolve, reject))
    .catch((error: any) => badUser(error, reject));
};

const service = (me: Member, database = db) => {
  store.commit("db", database);
  return new Promise((resolve, reject) => {
    console.log(me);
    if (empty(me.currentProject)) {
      loadUser(me, resolve, reject);
    } else {
      goProject(me, resolve, reject);
    }
  });
};
export default service;
