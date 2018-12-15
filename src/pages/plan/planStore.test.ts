import store from "./planStore.js";

it("should be able to change plan state", () => {
  const state = {
    session: {planState:""}
  };
  store.planState(state, "BANG");
  expect(state.session.planState).toBe("BANG");
});
