import gotoNext from "../direct.js";
import db from "../dbase.js";
import state from "../persist/state";
import { Day, Diary, Member } from "./member";

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

const blanker = <Member>{
  nick: "",
  name: "",
  role: "",
  skills: new Array<string>(),
  days: Array<Day>(),
  owner: false,
  birthday: null,
  currentProject: null,
  asperations: new Array<string>(),
  holidays: new Array<Date>(),
  diary: new Array<Diary>()
};

const service = {
  login: (email: string, pw: string, database = db) => {
    return new Promise((resolve, reject) => {
      console.log("About to logout then in");
      console.log(database);
      database
        .logOut()
        .then(database.logIn(email, pw))
        .catch((err: any) => reject(err))
        .then(() => {
          const user = blanker;
          user.name = email;
          gotoNext(user);
        })
        .catch((err: any) => reject(err))
        .then((here: string) => resolve(here))
        .catch((err: any) => reject(err));
    });
  },
  signup: (email: string, pw: string) => {
    return state.signup(email, pw, {
      metadata
    });
  }
};

export default service;
