import { State, Database, Project, Member } from "@/waterbear3";

export default {
  loaded: (state: State, l: boolean) => {
    console.log("Loaded? " + l);
    state.session.loaded = l;
  },
  stage: (state: State, newStage: string) => {
    state.signup.stages.push(newStage);
  },
  db: (state: State, database: Database) => {
    state.db = database;
  },
  error: (state: State, error: string) => {
    console.log("session now has this error:" + error);
    state.session.error = error;
  },
  project: (state: State, prj: Project) => {
    state.session.project = prj;
  },
  user: (state: State, user: Member) => {
    state.session.user = user;
  },
  log: (state: State, message: string) => {
    const item = {
      date: new Date(),
      message
    };
    state.feeds.push(item);
  }
};
