export default {
  loaded: (state, l) => {
    console.log("Loaded? " + l);
    state.session.loaded = l;
  },
  stage: (state, newStage) => {
    state.signup.stages.push(newStage);
  },
  db: (state, database) => {
    state.db = database;
  },
  error: (state, error) => {
    console.log("session now has this error:" + error);
    state.session.error = error;
  },
  project: (state, prj) => {
    state.session.project = prj;
  },
  user: (state, user) => {
    state.session.user = user;
  },
  log: (state, message) => {
    const item = {
      date: new Date(),
      message
    };
    state.feeds.push(item);
  }
};
