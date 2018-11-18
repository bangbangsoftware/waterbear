import db from "../dbase.js";
// import store from "../store.js";

const remote = {
  save: project => db.put(project),
  user: (name, data) => {
    return db.putUser(name, data);
  },
  signup: (email, pw, data) => db.signup(email, pw, data),
  getUser: name => db.getUser(name),
  load: projectID => db.get(projectID)
};

// This should abstract all the vuex store stuff away and couchdb load/save stuff.

const state = {
  save: project => {
    remote.save(project);
  },
  putUser: (name, data) => {
    remote.user(name, data);
  },
  getUser: name => remote.getUser(name),
  load: pid => remote.load(pid)
};

export default state;
