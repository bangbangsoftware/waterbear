import store from "../../store.js";

const service = story => {
  if (story.title.length === 0) {
    store.commit("storyError", "invalid story - missing title");
    return false;
  }

  if (!story.descAs || story.descAs.length === 0) {
    store.commit("storyError", 'invalid story - missing "As" description');
    return false;
  }

  if (story.descWant.length === 0) {
    store.commit("storyError", 'invalid story - missing "Want" description');
    return false;
  }

  if (story.descThat.length === 0) {
    store.commit("storyError", 'invalid story - missing "That" description');
    return false;
  }

  if (story.acs.length === 0) {
    store.commit("storyError", "invalid story - missing acceptance critera");
    return false;
  }
  store.commit("storyOk");
  return true;
};

export default service;
