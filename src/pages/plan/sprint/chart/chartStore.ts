import {SkillService} from "./skills.js";

const defaultSprint = {};

export default {
  sprintSkills: (state:any) => {
    const sprint =
      state.session.project.sprints === undefined
        ? defaultSprint
        : state.session.project.sprints[
            state.session.project.current.sprintIndex
          ];
    if (!state.session.skills) {
      state.session.skills = {};
    }
    state.session.skills.sprint = SkillService.sprintSkills(sprint);
  },
//  memberSkills: (state:any, startDate:Date, endDate:Date) => {
//    if (!state.session.skills) {
//      state.session.skills = {};
//    }
//    const members = SkillService.memberSkills(startDate, endDate, members);
//    state.session.skills.members = members;
//  },
  planChart: (state:any, both: any) => {
    state.session.planChartData = both;
  }
};
