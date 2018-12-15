import { SkillService} from "./skills.js";
import { Diary, Member } from "../../../../user/member";

const nick = "";
const name = "";
const role = "";
const skills = new Array<string>();
const days = DAYS;
const owner = false;
const birthday = null;
const currentProject = null;
const asperations = new Array<string>();
const holidays = new Array<Date>();
const diary = new Array<Diary>();
const members = new Array<Member>();
const corz = {
  nick,
  name,
  role,
  skills,
  days,
  owner,
  birthday,
  currentProject,
  asperations,
  holidays,
  diary
};
corz.name = "Cory";
corz.skills.push("vuejs");
corz.skills.push("couchdb");
members.push(corz);

const finn = {
  nick,
  name,
  role,
  skills,
  days,
  owner,
  birthday,
  currentProject,
  asperations,
  holidays,
  diary
};
finn.name = "Finn";
finn.skills.push("vuejs");
finn.skills.push("couchdb");
finn.skills.push("css");
members.push(finn);

const mick = {
  nick,
  name,
  role,
  skills,
  days,
  owner,
  birthday,
  currentProject,
  asperations,
  holidays,
  diary
};
mick.name = "Mick";
mick.skills.push("wasm");
members.push(mick);

it("Should be able to get all skills totals from all tasks in all stories in a sprint", () => {
  const task1 = {
    name: "Front end dev",
    est: 1,
    skill: "Javascript"
  };
  const task2 = {
    name: "Backend dev",
    est: 2,
    skill: "Java"
  };
  const task3 = {
    name: "Design stuff",
    est: 3,
    skill: "UX"
  };
  const task4 = {
    name: "Document",
    est: 4,
    skill: "None"
  };
  const task5 = {
    name: "Design stuff",
    est: 5,
    skill: "UX"
  };

  const story1 = {
    tasks: [task2, task3, task4]
  };

  const story2 = {
    tasks: [task1, task5]
  };

  const sprint = {
    list: [story1, story2]
  };

  const skills = SkillService.sprintSkills(sprint);

  const keys = Object.keys(skills);
  expect(keys.length).toBe(4);
  expect(skills.get("UX")).toBe(8);
  expect(skills.get("None")).toBe(4);
  expect(skills.get("Java")).toBe(2);
  expect(skills.get("Javascript")).toBe(1);
});

import { DAYS } from "../../../team/defaults.js";
import colors from "vuetify/es5/util/colors";
it("Should be able to get get availability for a team member", () => {

  const startDate = new Date(2017, 5, 11); // which is actually June
  const endDate = new Date(2017, 5, 17);

  const hours = SkillService.getAvailability(corz, startDate, endDate);
  expect(hours).toBe(5 * 8);
});

it("Should be able to get skills totals for a hours", () => {
  const skillHours = SkillService.getSkillHours(corz, 40);
  expect(skillHours.hours).toBe(40);
  expect(skillHours.skills[0]).toBe("vuejs");
  expect(skillHours.skills[1]).toBe("couchdb");
  expect(skillHours.skills[2]).toBe("css");
});

it("should be able to give a weight based on skill hours", () => {
  const skillHours = {
    hours: 40,
    skills: ["vuejs", "couchdb", "css"]
  };
  expect(SkillService.getWeight(skillHours)).toBe(120);
});

it("should be able to give a team skills", () => {
  const startDate = new Date(2017, 5, 11); // which is actually June
  const endDate = new Date(2017, 5, 17);

  const teamSkills = SkillService.getTeamSkills(members, startDate, endDate);
  expect(teamSkills.length).toBe(3);

  expect(teamSkills[0].hours).toBe(40);
  expect(teamSkills[1].hours).toBe(40);
  expect(teamSkills[2].hours).toBe(40);

  expect(teamSkills[0].weight).toBe(40);
  expect(teamSkills[1].weight).toBe(80);
  expect(teamSkills[2].weight).toBe(120);

  expect(teamSkills[0].skills.length).toBe(1);
  expect(teamSkills[1].skills.length).toBe(2);
  expect(teamSkills[2].skills.length).toBe(3);
});

it("Should be able to make a unique list of skills based on sprint and members", () => {
  const task1 = {
    name: "Front end dev",
    est: 35,
    skill: "vuejs"
  };
  const task2 = {
    name: "Backend dev",
    est: 2,
    skill: "couchdb"
  };
  const task3 = {
    name: "Design stuff",
    est: 3,
    skill: "css"
  };
  const task4 = {
    name: "Document",
    est: 4,
    skill: "Skydiving"
  };
  const task5 = {
    name: "Design stuff",
    est: 5,
    skill: "css"
  };
  const task6 = {
    name: "Front end dev",
    est: 32,
    skill: "vuejs"
  };

  const story1 = {
    tasks: [task2, task3, task4, task6]
  };

  const story2 = {
    tasks: [task1, task5]
  };

  const sprint = {
    list: [story1, story2]
  };

  const results = SkillService.toList(members, sprint);

  expect(results.length).toBe(4);
  expect(results.indexOf("vuejs")).toBeGreaterThan(-1);
  expect(results.indexOf("wasm")).toBe(-1);
  expect(results.indexOf("couchdb")).toBeGreaterThan(-1);
  expect(results.indexOf("css")).toBeGreaterThan(-1);
  expect(results.indexOf("Skydiving")).toBeGreaterThan(-1);
});

it("should be able to use a teams skill time", () => {
  const startDate = new Date(2017, 5, 11); // which is actually June
  const endDate = new Date(2017, 5, 17);
  const teamSkills = SkillService.getTeamSkills(members, startDate, endDate);

  const result = SkillService.useSkill(teamSkills, "vuejs", 1);
  expect(result.failed).toBe(false);
  expect(result.skillsLeft[1].hours).toBe(39);

  const result2 = SkillService.useSkill(teamSkills, "BANG", 1);
  expect(result2.failed).toBe(true);
});

it("should be able to balance teams skill with sprints need", () => {
  const task1 = {
    name: "Front end dev",
    est: 35,
    skill: "vuejs"
  };
  const task2 = {
    name: "Backend dev",
    est: 2,
    skill: "couchdb"
  };
  const task3 = {
    name: "Design stuff",
    est: 3,
    skill: "css"
  };
  const task4 = {
    name: "Document",
    est: 4,
    skill: "Skydiving"
  };
  const task5 = {
    name: "Design stuff",
    est: 5,
    skill: "css"
  };
  const task6 = {
    name: "Front end dev",
    est: 32,
    skill: "vuejs"
  };

  const story1 = {
    tasks: [task2, task3, task4, task6]
  };

  const story2 = {
    tasks: [task1, task5]
  };

  const sprint = {
    list: [story1, story2]
  };
  const startDate = new Date(2017, 5, 11); // which is actually June
  const endDate = new Date(2017, 5, 17);
  const results = SkillService.skillBalance(members, startDate, endDate, sprint);
  console.log("team", SkillService.getTeamSkills(members, startDate, endDate));
  console.log("sprint", SkillService.sprintSkills(sprint));
  console.log("results", results);

  expect(Object.keys(results).length).toBe(4);
  expect(results.get("wasm")).toBe(undefined);
  const tester = results.get("vuejs");1
  const result = (tester)? tester: {got:0,need:0}
  expect(result.got).toBe(68);
  expect(result.need).toBe(67);
  /*
   expect(results.ailed.length).toBe(1)
   expect(results.failed[0].skill).toBe('Skydiving')
   expect(results.failed[0].hours).toBe(4)
   expect(results.teamSkills[0].hours).toBe(0)
   expect(results.teamSkills[1].hours).toBe(3)
   e11xpect(results.teamSkills[2].hours).toBe(40)
   console.log(results.teamSkills)
   console.log(results.failed)
*/
});
