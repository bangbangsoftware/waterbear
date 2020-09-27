import store from "./chartStore";

it("That all the skills in all the tasks for all the stories", () => {
  expect(store.sprintSkills).toBeDefined();
});
