// import sprint from '../../../../common/stats/sprintStat.js'

import { Member, Hour, SkillHour, TeamSkill, Balance } from "@/waterbear3";

const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate);
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
};

const getDayHours = (date: Date, member: Member) => {
  const index = date.getDay();
  const fullday = member.days[index];
  const dayHours = fullday.day.filter((hour: Hour) => hour.on).length;
  const nightHours = fullday.night.filter((hour: Hour) => hour.on).length;
  // const together = parseInt(dayHours) + parseInt(nightHours);
  const together = dayHours + nightHours;
  return together;
};

const append = (list: any, item: any) => {
  if (list.indexOf(item) > -1) {
    return list;
  }
  list.push(item);
  return list;
};

const SkillService = {
  sprintSkills: (sprt: any, now = sprt.startDate): Map<string, number> => {
    const skillMap = new Map<string, number>();
    if (sprt === undefined) {
      console.log("No sprint as of yet");
      return skillMap;
    }
    if (now === undefined) {
      now = sprt.startDate;
    }
    const stories = sprt.list;
    if (stories === undefined) {
      console.log("Nothing in sprint as of yet");
      return skillMap;
    }
    const tasks = <any>[];
    stories.forEach((story: any) => {
      const newTasks = story.tasks;
      tasks.push.apply(tasks, newTasks);
    });
    tasks
      .filter((task: any) => typeof task !== "undefined")
      .forEach((task: any) => {
        console.log("task", task);
        console.log("sprint", sprt);
        let qty = skillMap.get(task.skill);
        if (typeof qty === "undefined" || qty === -1) {
          qty = 0;
        }
        qty = qty + parseInt(task.est);
        skillMap.set(task.skill, qty);
      });

    return skillMap;
  },
  getAvailability: (member: Member, startDate: Date, endDate: Date) => {
    // what day is the start Day
    // for members how many skill/hours
    // skillMap[skill] = qty
    if (startDate >= endDate) {
      console.error("start after end???: " + startDate + " > " + endDate);
      return 0;
    }
    const dates = getDates(startDate, endDate);
    const total = dates
      .map(date => getDayHours(date, member))
      .reduce((prev, hours) => hours + prev);

    return total;
  },
  getSkillHours: (member: Member, hours: number): SkillHour => {
    return {
      hours,
      skills: member.skills
    };
  },
  getWeight: (skillHours: any) => {
    if (skillHours.skills === undefined) {
      skillHours.skills = [];
    }
    return skillHours.hours * skillHours.skills.length;
  },
  getTeamSkills: (
    members: Array<Member>,
    startDate: Date,
    endDate: Date
  ): Array<TeamSkill> => {
    return members
      .filter(m => m !== undefined)
      .map(member => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const hours = SkillService.getAvailability(member, start, end);
        const skillHours = SkillService.getSkillHours(member, hours);
        const weight = SkillService.getWeight(skillHours);
        const withWeight: TeamSkill = {
          hours,
          skills: skillHours.skills,
          weight
        };
        return withWeight;
      })
      .sort((a, b) => a.weight - b.weight);
  },
  useSkill: (teamSkill: any, skill: any, hours: number): any => {
    let taken = false;
    let timeLeft = hours;
    const newTeamSkill = teamSkill
      .map((member: Member) => {
        if (member.skills.indexOf(skill) === -1) {
          return member; // Doesn't have the skill
        }
        if (member.hours === 0) {
          return member; // Doesn't have the time
        }
        taken = true;
        if (member.hours === undefined) {
          member.hours = 0;
        }

        if (member.hours >= timeLeft) {
          member.hours = member.hours - timeLeft;
          timeLeft = 0;
        } else {
          timeLeft = timeLeft - member.hours;
          member.hours = 0;
        }
        member.weight = SkillService.getWeight(member);
        return member;
      })
      .sort((a: Member, b: Member) => {
        if (!a.weight && !b.weight) {
          return 0;
        }
        if (!a.weight) {
          return -1;
        }
        if (!b.weight) {
          return 1;
        }
        return a.weight - b.weight;
      });

    // If no skill / time in team.... it should just fail, right?
    //      if (!taken) {
    //         newTeamSkill[0].hours = newTeamSkill[0].hours - hours
    //         newTeamSkill[0].weight = service.getWeight(newTeamSkill[0])
    //      }
    return {
      skillsLeft: newTeamSkill,
      failed: !taken
    };
  },
  sprint: (sprt: any, allUnique = []): Array<string> => {
    if (sprt === undefined || sprt.list === undefined) {
      return allUnique;
    }
    sprt.list
      .filter((story: any) => story.tasks !== undefined)
      .forEach((story: any) =>
        story.tasks.forEach((task: any) => append(allUnique, task.skill))
      );
    return allUnique;
  },
  members: (
    members: Array<Member>,
    allUnique = Array<string>()
  ): Array<string> => {
    //    if (members.list === undefined) {
    //      return allUnique;
    //    }
    members.forEach(memb => {
      memb.skills.forEach(skill => append(allUnique, skill));
    });
    return allUnique;
  },
  toList: (members: Array<Member>, sprt: any) => {
    return SkillService.members(members, SkillService.sprint(sprt, []));
  },
  getAverages: (teamSkills: any) => {
    const average: any = {};
    teamSkills.forEach((member: Member) => {
      if (member.hours === undefined) {
        member.hours = 0;
      }

      const split = member.hours / member.skills.length;
      member.skills.forEach(skill => {
        let total = average[skill];
        if (!total) {
          total = 0;
        }
        total = total + split;
        average[skill] = total;
      });
    });
    return average;
  },
  getAverage: (teamSkills: any, skill: any) => {
    const avs = SkillService.getAverages(teamSkills);
    if (avs && typeof avs[skill] === "number") {
      return avs[skill];
    }
    return 0;
  },
  skillBalance: (
    members: Array<Member>,
    startDate: Date,
    endDate: Date,
    sprt: any
  ): Map<string, Balance> => {
    let teamSkills = SkillService.getTeamSkills(members, startDate, endDate);
    const sprintHours = SkillService.sprintSkills(sprt);
    const skills = SkillService.toList(members, sprt);
    const results = new Map<string, Balance>();
    skills.forEach(skill => {
      const owt = sprintHours.get(skill);
      const hour = owt ? owt : 0;
      populateBalance(skill, results, hour, teamSkills);
    });
    skills.forEach(skill => {
      const bal = results.get(skill);
      let total = bal ? bal.got : 0;
      const need = bal ? bal.need : 0;
      const got = total + SkillService.getAverage(teamSkills, skill);
      const diff = got - need;
      if (bal) {
        bal.got = got;
        bal.diff = diff;
      }
    });
    return results;
  }
};

const populateBalance = (
  skill: string,
  results: Map<string, Balance>,
  sprintHours: number,
  teamSkills: any
) => {
  const balance = {
    need: 0,
    got: 0,
    diff: 0
  };
  let plan = {
    failed: true,
    skill: null,
    skillsLeft: []
  };
  if (sprintHours) {
    balance.need = sprintHours;
    plan = SkillService.useSkill(teamSkills, skill, sprintHours);
  }
  if (plan.failed) {
    balance.got = 0;
  } else {
    teamSkills = plan.skillsLeft;
    balance.got = sprintHours;
  }
  results.set(skill, balance);
};

export { SkillService };
