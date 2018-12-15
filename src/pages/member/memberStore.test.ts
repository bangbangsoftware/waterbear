import memberStore from "./memberStore.js";

it("That nick name can be stored", () => {
  const state = {
    session: {
      user: {nick:"sdjh"}
    }
  };
  memberStore.nick(state, "fred");
  expect(state.session.user.nick).toBe("fred");
});

it("Should be able to toggle night", () => {
  const state = {
    session: {
      user: {
        days: [
          {
            night: [
              {
                on: false
              }
            ]
          }
        ]
      }
    }
  };
  const time = {
    day: 0,
    hour: 0
  };
  memberStore.toggleNight(state, time);
  expect(state.session.user.days[0].night[0].on).toBe(true);
});

it("Should be able to toggle day", () => {
  const state = {
    session: {
      user: {
        days: [
          {
            day: [
              {
                on: false
              }
            ]
          }
        ]
      }
    }
  };
  const time = {
    day: 0,
    hour: 0
  };
  const hr = memberStore.toggleDay(state, time);
  console.log("hr", hr);
  expect(state.session.user.days[0].day[0].on).toBe(true);
});

it("Should be able to add an array of hours", () => {
  const state = {
    session: {
      user: {}
    }
  };
  memberStore.day(state, {
    day: [
      {
        on: true
      }
    ]
  });
  const user = <any> state.session.user;
  expect(user.days[0].day[0].on).toBe(true);
});

it("Should be able to add a member", () => {
  const state = {
    members: []
  };
  memberStore.addMember(state, "fred");
  expect(state.members[0]).toBe("fred");
});
