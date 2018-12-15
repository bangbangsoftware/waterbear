import owner from "./owner.js";
import store from "../../../store.js";
import Vue from "vue";

beforeEach(() => {
  // store setup
  const project = {
    _id: "faker",
    stories: []
  };
  store.commit("project", project);
  const fakeDB = {
    get: (id:number) => {
      return new Promise(resolve => {
        console.log(id);
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

it("should set owner up with blank fields", () => {
  const data = owner.data();
  expect(data.ownerName).toBe("");
  expect(data.ownerRole).toBe("");
  expect(data.error).toBe("");
});

it("should have default roles available", () => {
  const data = owner.data();
  const defaults = store.state.defaults.roles;
  expect(data.roles.length).toBe(defaults.length);
});

it("should validate blank owner's name", () => {
  const poster = owner.methods.owner;
  expect(poster("", "")).toBe("What's your name?");
});

it("should validate owner's name", () => {
  const email = "boom@boom.com";
  store.commit("stage", {
    email
  });
  const poster = owner.methods.owner;
  expect(poster("Fred", "")).toBe("");
  Vue.nextTick(() => {
    const state = <any> store.state;
    expect(state.project.owner).toBe("Fred");
    const defaults = store.state.defaults.roles;
    expect(state.project.defaults.roles.length).toBe(defaults.length);
    expect(state.stages.length).toBe(1);
    expect(state.stages[0].name).toBe("Fred");
    expect(state.feed.length).toBe(1);
    expect(state.feed[0].message).toBe("Hi Fred");
  });
});

it("should validate owner's name and role", () => {
  const poster = owner.methods.owner;
  expect(poster("Dick", "Superman")).toBe("");
  Vue.nextTick(() => {
    const state = <any> store.state;
    const defaults = store.state.defaults.roles;
    expect(state.project.defaults.roles.length).toBe(defaults.length);
    expect(state.stages.length).toBe(1);
    expect(state.stages[0].name).toBe("Dick");
    expect(state.stages[0].role).toBe("Superman");
    expect(state.feed.length).toBe(1);
    expect(state.feed[0].message).toBe("Hi Dick");
  });
});
