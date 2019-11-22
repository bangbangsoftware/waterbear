import story from "./story.js";
import store from "../../store.js";

const blankStory = () => {
  const myStory = {
    title: "",
    desc: "",
    acs: []
  };
  store.commit("clearStory");
  store.commit("story", myStory);
  return myStory;
};

describe("story.test.js", () => {
  beforeEach(() => {
    // store setup
    const project = {
      _id: "faker",
      stories: []
    };
    store.commit("project", project);
    blankStory();
    const fakeDB = {
      get: () => {
        return new Promise(resolve => {
          resolve(project);
        });
      },
      put: (prj:any) => {
        return new Promise(resolve => {
          console.log(prj);
          resolve(prj);
        });
      }
    };
    store.commit("db", fakeDB);
  });

  it("should default to invalid story ", () => {
    const data = story.data();
    expect(data.story.valid).toBe(false);
  });

  it("should have no stories in project by default", () => {
    expect(store.state.session.project.stories.length).toBe(0);
  });

  it("should NOT add an invalid story with no fields filled in", () => {
    var myStory = blankStory();
    story.methods.postStory(myStory);
    expect(store.state.session.project.stories.length).toBe(0);
  });

  it("should NOT add an invalid story with one field filled in", () => {
    store.commit("title", "tester");
    story.methods.postStory(store.state.session.story);
    expect(store.state.session.project.stories.length).toBe(0);
  });

  it("should NOT add an invalid story with two field filled in", () => {
    store.commit("title", "tester");
    store.commit("desc", "tesc desc");
    story.methods.postStory(store.state.session.story);
    expect(store.state.session.project.stories.length).toBe(0);
  });

  it("should add a valid story", () => {
    store.commit("title", "tester");
    store.commit("descAs", "tesc desc");
    store.commit("desc", {
      as: "blind man",
      want: "to see",
      that: "can understand"
    });
    var crit = {};
    store.commit("acceptance", crit);
    story.methods.postStory(store.state.session.story);
    expect(store.state.session.project.stories.length).toBe(1);
  });
});
