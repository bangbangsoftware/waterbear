import feedComp from "./feed";
import store from "../../store";

describe("feed.spec.js", () => {
  it("should have a feed array", () => {
    const data = feedComp.data();
    expect(data.feeds.length).toBe(0);
  });

  it("should respond to a feed change", () => {
    store.commit("log", "bang");
    const data = feedComp.data();
    expect(data.feeds.length).toBe(1);
  });

  it("should render birthday time correctly using filter ", () => {
    const time = feedComp.filters.time;
    const birthday = new Date(2017, 7, 21, 8, 0, 1, 666);
    expect(time(birthday)).toBe("08:00:01");
  });

  it("should render xmas time correctly using filter ", () => {
    const time = feedComp.filters.time;
    const birthday = new Date(2017, 12, 25, 0, 1, 0, 0);
    expect(time(birthday)).toBe("00:01:00");
  });
});
