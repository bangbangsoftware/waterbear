import comp from "./task";
import store from "../../../store";

it("Can post tasks", () => {
  const mockDB = {
    get: () =>
      Promise.resolve({
        stories: [{}]
      })
  };
  store.commit("db", mockDB);
  const task = {
    name: "bingo",
    est: 10,
    desc: "French Disco",
    skill: "slinking"
  };
  comp.methods.postTask(task);
  task.name = "";
  comp.methods.postTask(task);
});

it("Can post tasks", () => {
  let proj;
  const mockDB = {
    get: () =>
      Promise.resolve({
        stories: [{}]
      }),
    put: (p:any) => {
      proj = p;
    }
  };
  store.commit("db", mockDB);
  const task = {
    name: "bingo",
    est: 10,
    desc: "French Disco",
    skill: "slinking"
  };
  store.commit("currentStory", {
    index: 0
  });
  console.log("comp", comp);
  console.log("proj", proj);
  comp.methods.postTask(task);
  //expect(proj.id).toBe(3)
});

it("Can store task name", () => {
  comp.methods.storeName("bingo");
});

it("Can store task desc", () => {
  comp.methods.storeDesc("bingo");
});

it("Can store task est", () => {
  comp.methods.storeEst("10");
});

it("Can store task skill", () => {
  comp.methods.storeSkill("vue");
});
