import contingency from "./contingency.js";

import memberData from "./test.member.js";
import sprintData from "./test.sprint.js";
const freshData = JSON.parse(JSON.stringify(sprintData));

describe("contingency.test.js: Should be able to give contingency", () => {
  it("be able to give contingency for a health sprint", () => {
    /// ??? sprintData.startDate = new Date(2018, 7, 21, 12, 20, 0, 0);
    const now = new Date(2018, 7, 2, 12, 20, 0, 0);
    const another = JSON.parse(JSON.stringify(memberData));
    const state = contingency(sprintData, [memberData, another], now);

    expect(state.skills.length).toBe(1);
    const skill = state.skills[0];

    expect(skill.name).toBe("vue");
    expect(skill.onTrack).toBe(true);
    expect(skill.hoursOver).toBe(0);

    expect(state.members.length).toBe(2);
    const member1 = state.members[0];
    const member2 = state.members[1];

    expect(member1.left).toBe(36);
    expect(member2.left).toBe(56);
  });

  it("be able to give contingency for an over sprint", () => {
    // ???? sprintData.startDate = new Date(2018, 7, 21, 12, 20, 0, 0);
    const bigTask = {
      name: "The big one",
      desc: "This big one is going to break the sprint",
      est: 100,
      skill: "vue",
      error: "",
      valid: true,
      index: 0
    };
    // ??? sprintData.list[0].tasks.push(bigTask);

    const now = new Date(2018, 7, 2, 12, 20, 0, 0);
    const another = JSON.parse(JSON.stringify(memberData));
    const state = contingency(sprintData, [memberData, another], now);

    expect(state.skills.length).toBe(1);
    const skill = state.skills[0];

    expect(skill.name).toBe("vue");
    expect(skill.onTrack).toBe(false);
    expect(skill.hoursOver).toBe(8);

    expect(state.members.length).toBe(2);
    const member1 = state.members[0];
    const member2 = state.members[1];

    expect(member1.left).toBe(0);
    expect(member2.left).toBe(0);
  });

  it("be able to give contingency for a sprint needs a missing skill", () => {
    freshData.startDate = new Date(2018, 7, 21, 12, 20, 0, 0);
    const bigTask = {
      name: "Webpack work",
      desc: "No one has webpack skills",
      est: 10,
      skill: "webpack",
      error: "",
      valid: true,
      index: 0
    };
    freshData.list[0].tasks.push(bigTask);

    const now = new Date(2018, 7, 2, 12, 20, 0, 0);
    const another = JSON.parse(JSON.stringify(memberData));
    const state = contingency(freshData, [memberData, another], now);

    expect(state.skills.length).toBe(2);
    const skill = state.skills[0];
    const skill2 = state.skills[1];

    expect(skill2.name).toBe("webpack");
    expect(skill2.onTrack).toBe(false);
    expect(skill2.hoursOver).toBe(10);

    expect(skill.name).toBe("vue");
    expect(skill.onTrack).toBe(true);
    expect(skill.hoursOver).toBe(0);

    expect(state.members.length).toBe(2);
    const member1 = state.members[0];
    const member2 = state.members[1];

    expect(member1.left).toBe(36);
    expect(member2.left).toBe(56);
    expect(state.totalHoursLeft).toBe(92);
  });
});
