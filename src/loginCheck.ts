import store from "./store";
import db from "./dbase";

import resolveUser from "./direct";

const runaway = (reject: Function, jump = true) => (message: string) => {
  store.commit("loaded", false);
  store.commit("error", "Need to login");
  if (window && jump) {
    window.location.href = "#/";
  }
  reject(message);
};

const checkSession = (error: Function) => (session: any, resolve: Function) => {
  if (!session) {
    error("No Session");
    return;
  }
  if (!resolve) {
    resolve = () => {};
  }
  const me = session.userCtx;
  if (!me.name) {
    error("There is no me");
    return;
  }
  console.log("Back from the session you are...");
  console.log(me);
  resolveUser(me)
    .then(() => {
      store.commit("loaded", true);
      resolve(me);
    })
    .catch(err => {
      error(err);
    });
};

const noDatabase = (resolve: Function, reject: Function, checker: Function) => {
  console.error("No database");
  store.commit("user", false);
  db.getSession()
    .then((session: any) => checker(session))
    .catch((err: any) => runaway(reject)(err));
};

const empty = (what: Object): boolean => {
  if (!what || what === null || what === undefined) {
    return true;
  }
  const keys = Object.keys(store.state.db);
  if (keys && keys.length === 1 && keys[0] === "put") {
    // Just an observable..
    return true;
  }
  return false;
};

const service = function(jump = true) {
  store.commit("loaded", false);
  return new Promise((resolve, reject) => {
    const error = runaway(reject, jump);
    const checker = checkSession(error);
    console.log(store.state.db);

    if (empty(store.state.db)) {
      noDatabase(resolve, reject, checker);
    } else {
      store.commit("error", "");
      store.commit("loaded", true);
      resolve(true);
      return;
    }
  });
};
export default service;
