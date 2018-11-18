import util from "./util.js";
import dataOne from "./test.data.js";

describe("sprintStat.test.js: How time works with the sprint and members", () => {
  it("Should be able tell how many hours a member has on a given day", () => {
    const data = dataOne();
    const hours = util.hours(data.member, data.startDate);
    expect(hours).toBe(8);
    const none = util.hours(data.member, data.saturday);
    expect(none).toBe(0);
  });

  it("Should be able to tell what hours a member has at a point of time", () => {
    const data = dataOne();
    const user = data.member;
    const now = new Date(2018, 7, 22, 7, 0, 0, 0);
    const state = util.currentHours(now, user);
    expect(state.done).toBe(0);
    expect(state.left).toBe(8);

    const later = new Date(2018, 7, 22, 12, 20, 0, 0); // 11:20 am
    const state2 = util.currentHours(later, user);
    expect(state2.done).toBe(3);
    expect(state2.left).toBe(5);
  });

  it("Should map date", () => {
    expect(util.mapper("1pm")).toBe(13);
    expect(util.mapper("2pm")).toBe(14);
    expect(util.mapper("3pm")).toBe(15);
    expect(util.mapper("12pm")).toBe(0);
    expect(util.mapper("12am")).toBe(12);
  });

  it("Should tell many hours a member has left in sprint", () => {
    const data = dataOne();
    const hours = util.hoursLeftInSprint(
      data.sprint,
      data.member,
      data.startDate
    );
    expect(hours).toBe(56);
  });
});
