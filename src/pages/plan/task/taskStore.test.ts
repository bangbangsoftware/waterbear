import store from "./taskStore";

it("task error can be set", () => {
  const state = {
    session: {
      task: {valid:true,error:''}
    }
  };
  store.taskError(state, "hello");
  expect(state.session.task.valid).toBe(false);
  expect(state.session.task.error).toBe("hello");
});

it("task ok can be set", () => {
  const state = {
    session: {
      task: {valid:true,error:''}
    }
  };
  store.taskOk(state);
  expect(state.session.task.valid).toBe(true);
  expect(state.session.task.error).toBe("");
});

it("task can be cleared", () => {
  const state = {
    session: {
      task: {valid:true,name:'dddd'}
    }
  };
  store.clearTask(state);
  expect(state.session.task.valid).toBe(false);
  expect(state.session.task.name).toBe("");
});

it("task name can be set", () => {
  const state = {
    session: {
      task: {valid:true,name:'dddd'}
    }
  };
  store.clearTask(state);
  store.taskName(state, "ringo");
  expect(state.session.task.name).toBe("ringo");
});

it("task desc can be set", () => {
  const state = {
    session: {
      task: {
        name: "ringo",
        desc:"lllll"
      }
    }
  };
  store.clearTask(state);
  state.session.task.name = "ringo";

  store.taskDesc(state, "blar");
  expect(state.session.task.desc).toBe("blar");
});

it("task desc can be set", () => {
  const state = {
    session: {
      task: {
        name: "ringo",
        desc:"jjj"
      }
    }
  };
  store.clearTask(state);

  store.taskDesc(state, "blar");
  expect(state.session.task.desc).toBe("blar");
});

it("task skill can be set", () => {
  const state = {
    session: {
       task: {
        name: "ringo",
        desc:"jjj",
        skill:''
      }
    }
  };
  store.clearTask(state);
  state.session.task.name = "ringo";
  state.session.task.desc = "blar";

  store.taskSkill(state, "running");
  expect(state.session.task.skill).toBe("running");
});

it("task est can be set", () => {
  const state = {
    session: {
      task: {
         name: "ringo",
        desc:"jjj",
        skill:"kkk",
        est:-1
      }
    }
  };
  store.clearTask(state);
  state.session.task.name = "ringo";
  state.session.task.desc = "blar";
  state.session.task.skill = "running";
  store.taskEst(state, 10);
  expect(state.session.task.est).toBe(10);
});

it("can select a task", () => {
  const state = {
    session: {
       task: {
         name: "ringo",
        desc:"jjj",
        skill:"kkk",
        est:-1
      }
    }
  };
  store.clearTask(state);
  state.session.task.name = "ringo";
  state.session.task.desc = "blar";
  state.session.task.skill = "running";
  state.session.task.est = 10;

  store.selectTask(state, state.session.task);
  expect(state.session.task.name).toBe("ringo");
});

it("can add a task", () => {
  const state = {
    session: {
        task: {
         name: "ringo",
        desc:"jjj",
        skill:"kkk",
        est:-1
      },
      project: {
        stories: [
          {
            tasks: [{name:''}]
          }
        ]
      },
      story: {
        index: 0
      }
    }
  };
  store.clearTask(state);
  state.session.task.name = "banger";
  state.session.task.desc = "blar";
  state.session.task.skill = "running";
  state.session.task.est = 10;

  store.task(state, state.session.task);
  expect(state.session.project.stories[0].tasks[0].name).toBe("banger");
});
