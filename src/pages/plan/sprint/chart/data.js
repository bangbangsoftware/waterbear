import store from "../../../../store.js";

import skills from "./skills.js";

const getBoth = (skills, results) => {
  const just = {};
  skills.forEach(skill => {
    just[skill] = results[skill];
  });

  const needs = Object.values(just).map(r => r.need);
  const gots = Object.values(just).map(r => r.got);
  return {
    needs,
    gots,
    skills
  };
};

const debug = (what, out) => {
  console.log("%s gots %o", what, out.gots);
  console.log("%s needs %o", what, out.needs);
};

const comp = {
  refresh: (from = new Date(), to = new Date(+new Date() + 12096e5)) => {
    const project = store.state.session.project;
    const sprint =
      project.sprints === undefined
        ? {}
        : project.sprints[store.state.session.project.current.sprintIndex];
    const members = project.members ? project.members : [];
    const results = skills.skillBalance(members, from, to, sprint);

    const sprintSkills = skills.sprint(sprint);
    const balance = getBoth(sprintSkills, results);
    debug("balance", balance);
    const allSkills = Object.keys(results);
    const memberSkills = [];
    allSkills.forEach(key => {
      if (sprintSkills.indexOf(key) === -1) {
        memberSkills.push(key);
      }
    });
    const spareSkills = getBoth(memberSkills, results);
    debug("spare", balance);
    const balanceAndSpare = {
      balance,
      spareSkills
    };
    store.commit("planChart", balanceAndSpare);
    return balanceAndSpare;
  }
};

export default comp;
