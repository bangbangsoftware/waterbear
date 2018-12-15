import sprint from "./sprintStat.js";

import dataOne from "../test.data.js";

describe("sprintStat.test.js: How time works with the sprint and members", () => {
  it("Should tell many hours left in sprint for two members", () => {
    const data = dataOne();
    const hours = sprint.hoursLeft(data.sprint, data.members, data.startDate);
    expect(hours).toBe(112);

    const lessHours = sprint.hoursLeft(
      data.sprint,
      data.members,
      data.weekLater
    );
    expect(lessHours).toBe(32);

    const noHours = sprint.hoursLeft(data.sprint, data.members, data.over);
    expect(noHours).toBe(0);
  });
});

// Need to describe how the sprint is doing by with % behind/infront.
// What tasks are dragging
// What tasks where done quickly
describe("sprintStat.test.js: Describe how the sprint is doing", () => {
  xit("Should be able to tell how far behind a sprint is", () => {
    const data = dataOne();
    const mockSprint = data.sprint;
    const member = data.member;
    const now = data.startDate;

    const summary = <any> sprint.state(mockSprint, member, now);
    expect(summary.state).toBe("PICK_TASK");
    expect(summary.timeLeft).toBe(50);

    expect(summary.skillBalance.length).toBe(1);
    const skillBalance = summary.skillBalance[0];
    expect(skillBalance.name).toBe("vue");
    expect(skillBalance.balance).toBe(0);

    expect(summary.description).toBe("");
  });
});
