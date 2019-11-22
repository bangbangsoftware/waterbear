import project from "./project.js";
import store from "../../../store.js";

describe("project.spec.js", () => {
  it("should have empy fields to start with ", () => {
    store.commit("db", {
      fakedb: "true"
    });
    const data = project.data();
    expect(data.projectName).toBe("");
    expect(data.error).toBe("");
    //  expect(store.state.session.error).toBe('Need to login')
    expect(store.state.session.error).toBe("");
  });
});
