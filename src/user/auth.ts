import gotoNext from "../direct.js";
import db from "../dbase.js";
import state from "../persist/state";

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
   login: (email:string, pw:string, database = db) => {
    return new Promise((resolve, reject) => {
      console.log("About to logout then in");
      console.log(database);
      database
        .logOut()
        .then(database.logIn(email, pw))
        .catch((err:any) => reject(err))
        .then(() => gotoNext({ name: email }))
        .catch((err:any) => reject(err))
        .then((here:string) => resolve(here))
        .catch((err:any) => reject(err));
    });
  },
        signup: (email:string, pw:string) => {
    return state.signup(email, pw, {
      metadata
    });
  }
};

export default service;
