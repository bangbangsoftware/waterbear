import db from "../dbase";
import { Project, Member } from "@/waterbear3";
// import store from "../store.js";

const remote = {
  save: (project: any): Promise<any> => db.put(project),
  user: (name: string, data: any) => {
    return db.putUser(name, data);
  },
  signup: (email: string, pw: string, data: any): Promise<any> =>
    // db.signUp(email, pw, data),
    db.signUp(email, pw),
  getUser: (name: string): Promise<any> => {
    console.log("get user (" + name + ")");
    return db.getUser(name);
  },
  load: (projectID: string) => db.get(projectID)
};

// This should abstract all the vuex store stuff away and couchdb load/save stuff.

const state = {
  save: (project: Project): Promise<any> => {
    return remote.save(project);
  },
  signup: (email: string, pw: string, data: any): Promise<any> =>
    remote.signup(email, pw, data),
  putUser: (name: string, data: any) => {
    remote.user(name, data);
  },
  getUser: (name: string): Promise<Member> => remote.getUser(name),
  load: (pid: string | null) => {
    return pid === null
      ? Promise.reject("No project defined")
      : remote.load(pid);
  }
};

export default state;
