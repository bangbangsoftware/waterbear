import Vue from "vue";

import { Bar } from "vue-chartjs";

import store from "../../../../store";

import { SkillService, TeamSkill } from "./skills";

const comp = {
  extends: Bar,
  mounted() {
    const project = store.state.session.project;
    console.log("The project is %o", project);
    const members = project.members;
    const now = new Date();
    const fortnightAway = new Date(+new Date() + 12096e5);
    const teamSkills = SkillService.getTeamSkills(members, now, fortnightAway);
    const names = members.map(member => member.nick); // too big + ' [' + member.skills + ']')
    const hours = teamSkills.map((ts: TeamSkill) => ts.hours);
    const that = <any>this;
    that.renderChart({
      labels: names,
      datasets: [
        {
          label: "Members",
          backgroundColor: "#f87979",
          data: hours
        }
      ]
    });
  }
};

Vue.component("memberChart", comp);
export default comp;
