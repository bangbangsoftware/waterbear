import {Member} from './user/member';
export default {
  loaded: (state: any, l: boolean) => {
    console.log('Loaded? ' + l);
    state.session.loaded = l;
  },
  stage: (state: any, newStage: any) => {
    state.signup.stages.push(newStage);
  },
  db: (state: any, database: any) => {
    state.db = database;
  },
  error: (state: any, error: any) => {
    console.log('session now has this error:' + error);
    state.session.error = error;
  },
  project: (state: any, prj: any) => {
    state.session.project = prj;
  },
  user: (state: any, user: Member) => {
    state.session.user = user;
  },
  log: (state: any, message: string) => {
    const item = {
      date: new Date(),
      message,
    };
    state.feeds.push(item);
  },
};
