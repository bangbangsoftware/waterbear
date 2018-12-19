import gotoNext from "../direct";
import db from "../dbase";
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
        .then(() => database.logIn(email, pw))
        .catch((err: any) => reject(err))
        .then(() => {
          const user = blanker;
          user.name = email;
          return gotoNext(user);
        })
        .catch((err: any) => reject(err))
        .then((here: any) => resolve(here))
        .catch((err: any) => reject(err));
    });
  },
  signup: (email: string, pw: string): Promise<any> => {
    return state.signup(email, pw, {
      metadata
    });
  }
};

export default service;
