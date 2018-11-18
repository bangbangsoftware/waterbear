import store from "./backlogStore.js";

it("can add to sprint", () => {
  const state = {
    session: {
      project: {
        sprints: [
          {
            name: "hello"
          }
        ],
        stories: ["This isn't real"],
        current: {
          sprintIndex: 0
        }
      }
    }
  };
  store.addToSprint(state, 0);
  expect(
    state.session.project.sprints[state.session.project.current.sprintIndex]
      .list[0]
  ).toBe("This isn't real");
});

it("can add to sprint", () => {
  const state = {
    session: {
      project: {
        sprints: [],
        stories: ["This isn't real"],
        current: {
          sprintIndex: 0
        }
      }
    }
  };
  store.addToSprint(state, 0);
  expect(
    state.session.project.sprints[state.session.project.current.sprintIndex]
      .list[0]
  ).toBe("This isn't real");
});
