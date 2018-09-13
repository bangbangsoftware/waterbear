import store from "./store.js";
import check from "./loginCheck.js";
import Vue from "vue";

describe("login check depends on db", () => {
  it("should not be valid if no db ", () => {
    check().then(answer => {
      expect(answer).toBe(false);
      expect(store.state.session.error).toBe("Need to login");
    });
    Vue.nextTick();
  });
  it("should be valid if there is a db ", () => {
    store.commit("db", {});
    check().then(answer => {
      expect(answer).toBe(true);
      expect(store.state.session.error).toBe("");
    });
    Vue.nextTick();
  });
});
