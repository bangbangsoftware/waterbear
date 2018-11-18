import gotoNext from "../direct.js";
import db from "../dbase.js";
import state from "..//persist/state.js";

const metadata = {
  nick: "",
  role: "",
  birthday: "",
  skills: [],
  asperations: [],
  days: [],
  holidays: [],
  owner: false
};

const service = {
  login: (email, pw, database = db) => {
    return new Promise((resolve, reject) => {
      console.log("About to logout then in");
      console.log(database);
      database
        .logOut()
        .then(database.logIn(email, pw))
        .catch(err => reject(err))
        .then(() => gotoNext({ name: email }))
        .catch(err => reject(err))
        .then(here => resolve(here))
        .catch(err => reject(err));
    });
  },
  signup: (email, pw) => {
    return state.signup(email, pw, {
      metadata
    });
  }
};

export default service;
