import refine from "./refine";
import store from "../../store";
import { Project, Story, Task } from "@/waterbear3";

const storyOne = <Story>{
  id: 2,
  index: 1,
  selected: false,
  title: "Story number one",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 4,
  acs: [],
  valid: true,
  error: "",
  points: 8,
  tasks: []
};

const storyTwo = <Story>{
  id: 2,
  index: 2,
  selected: false,
  title: "Story number two",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 4,
  acs: [],
  valid: true,
  error: "",
  points: 8,
  tasks: []
};

const storyThree = <Story>{
  id: 3,
  index: 3,
  selected: false,
  title: "Story number three",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 4,
  acs: [],
  valid: true,
  error: "",
  points: 8,
  tasks: [
    <Task>{
      error: "",
      name: "Do a load of vuejs",
      desc: "",
      skill: "VueJS",
      est: 10,
      valid: false
    }
  ]
};

const storyFour = <Story>{
  id: 4,
  index: 4,
  selected: false,
  points: 0,
  title: "Story number four",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 4,
  acs: [],
  valid: true,
  error: "",
  tasks: [
    <Task>{
      error: "",
      name: "Do more  vuejs",
      desc: "",
      skill: "VueJS",
      est: 20,
      valid: false
    }
  ]
};

const storyFive = <Story>{
  id: 5,
  index: 5,
  selected: false,
  title: "Story number five",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 4,
  acs: [],
  valid: true,
  error: "",
  points: 3,
  tasks: [
    <Task>{
      error: "",
      name: "Do more  vuejs",
      desc: "",
      skill: "VueJS",
      est: 20,
      valid: false
    }
  ]
};

const project = <Project>{
  _id: "faker",
  stories: [storyOne, storyTwo, storyThree, storyFour, storyFive]
};

//
// As product owner in a refinement meeting
// I was to add story points and add tasks to stories
// So that they are ready for sprint planning
//
// Acceptance:
//
// mvp: (minimum viable product)
// 1. Be able to see how many stories are incomplete
// 2. Be able to add story points
// 3. Be able go to next incomplete story
//
describe("refined.test", () => {
  beforeEach(() => {
    // store setup
    store.commit("project", project);
    const fakeDB = {
      get: () => {
        return new Promise(resolve => {
          resolve(project);
        });
      },
      put: (prj: any) => {
        return new Promise(resolve => {
          console.log(prj);
          resolve(prj);
        });
      }
    };
    store.commit("db", fakeDB);
  });

  it("1. Should know what the state the backlog is in ", () => {
    const state = refine.methods.backlogState(project);
    expect(state.incomplete.length).toBe(3);
    expect(state.complete.length).toBe(2);
  });

  it("2. Should ibe able to add story points", () => {});

  it("3a. Should be able to set session to first incomplete ", () => {
    const first = refine.methods.startIncomplete(project);
    if (!first) {
      expect("No story").toBe(false);
    } else {
      expect(first.title).toBe(storyThree.title);
    }
  });

  it("3b. Should be to get next incomplete", () => {
    const next = refine.methods.nextIncomplete(project);
    if (!next) {
      expect("No story").toBe(false);
    } else {
      expect(next.title).toBe(storyFive.title);
    }

    const andAgain = refine.methods.nextIncomplete(project);
    if (!andAgain) {
      expect("No story").toBe(false);
    } else {
      expect(andAgain.title).toBe(storyThree.title);
    }

    const onceAgain = refine.methods.nextIncomplete(project);
    if (!onceAgain) {
      expect("No story").toBe(false);
    } else {
      expect(onceAgain.title).toBe(storyFive.title);
    }
  });
});
