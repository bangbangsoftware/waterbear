import store from "./selectStore";

it("if can be selected", () => {
  const state = {
    session: {
      project: {
        current: {}
      }
    }
  };
  store.selectSprint(state, 45);
  const current = <any> state.session.project.current;
  expect(current.sprintIndex).toBe(45);
});

it("Sprint can set sprint name", () => {
  const state = {
    session: {
      sprint: {}
    }
  };
  store.sprintName(state, "Bug fix");
  const sprint = <any> state.session.sprint;
  expect(sprint.name).toBe("Bug fix");
});

it("can set sprint days", () => {
  const state = {
    session: {
      sprint: {
        name: "A Sprint"
      }
    }
  };
  store.sprintDays(state, ["A Bug fix"]);
  const sprint = <any> state.session.sprint;
  console.log(sprint);
  expect(sprint.days[0]).toBe("A Bug fix");
});

it("can set sprint days", () => {
  const state = {
    session: {
      sprint: {}
    }
  };
  store.sprintDays(state, ["A Bug fix"]);
  const sprint = <any> state.session.sprint;
  console.log(sprint);
  expect(sprint.days[0]).toBe("A Bug fix");
});

it("can set sprint error", () => {
  const state = {
    session: {
      sprint: {}
    }
  };
  store.sprintError(state, "Wrong");
  const sprint = <any> state.session.sprint;
  expect(sprint.error).toBe("Wrong");
  expect(sprint.valid).toBe(false);
});

it("can set sprint to be ok", () => {
  const state = {
    session: {
      sprint: {}
    }
  };
  store.sprintOk(state);
  const sprint = <any> state.session.sprint;
  expect(sprint.error).toBe("");
  expect(sprint.valid).toBe(true);
});

it("can post sprint", () => {
  const state = {
    session: {
      project: {}
    }
  };
  const sprint = {
    name: "fred"
  };
  store.postSprint(state, sprint);
  const project = <any> state.session.project;
  expect(project.sprints[0].name).toBe("fred");
});

it("if can take from sprint", () => {
  const story = {
    name: "fred's story",
    index: 0
  };
  const sprint = {
    name: "fred",
    list: [story]
  };
  const state = {
    session: {
      project: {
        sprints: [sprint],
        stories: [],
        current: {
          sprintIndex: 0
        }
      }
    }
  };
  store.takeFromSprint(state, 0);
  expect(state.session.project.sprints[0].list.length).toBe(0);
  expect(state.session.project.stories.length).toBe(1);
  const first  = <any> state.session.project.stories[0];
  expect(first.index).toBe(-1);
});
