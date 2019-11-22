import util from "../util";
import tasks from "./tasks";
import { MemberTime, MemberRemain, Member, Track } from "@/waterbear3";

const addTask = (map: any, skill: string, qty: string) => {
  const amount = parseInt(qty);
  const total = map[skill];
  const newTotal = total === undefined ? amount : total + amount;
  map[skill] = newTotal;
};

const hasSkill = (m: MemberTime, skill: string) => {
  const skills = m.skills;
  const index = skills.indexOf(skill);
  return index > -1;
};

const update = (memberTime: MemberTime, take: number) => {
  const left = memberTime.left;
  const skills = memberTime.skills;
  const newLeft = left >= take ? left - take : 0;
  const remainder = newLeft === 0 ? take - left : 0;
  return {
    memberTime: {
      left: newLeft,
      skills,
      details: memberTime.details
    },
    remainder
  };
};

const totalTime = (memberTimes: Array<MemberTime>, skill: string) => {
  const skillBase = memberTimes.filter((m: MemberTime) => hasSkill(m, skill));
  if (skillBase.length === 0) {
    return 0;
  }
  return skillBase.map(m => m.left).reduce((t, c) => t + c);
};

const fill = (
  memberTimes: Array<MemberTime>,
  skill: string,
  amount: number
): MemberRemain => {
  if (totalTime(memberTimes, skill) < 1) {
    return {
      memberTimes,
      remainder: amount
    };
  }
  if (amount < 1) {
    return {
      memberTimes,
      remainder: 0
    };
  }
  let balance = amount;
  const newMemberTime = memberTimes.map((m: MemberTime) => {
    if (hasSkill(m, skill)) {
      const newState = update(m, balance);
      balance = newState.remainder;
      return newState.memberTime;
    }
    return m;
  });
  return fill(newMemberTime, skill, balance);
};

const comp = (
  sprint: any,
  members: Array<Member>,
  now: Date,
  work = tasks.allTasks(sprint)
) => {
  // how much time does each member have left in the sprint????
  let memberTimes = members.map(details => {
    const left = util.hoursLeftInSprint(sprint, details, now);
    return {
      details,
      left,
      skills: details.skills
    };
  });

  // how much tasks are left to do??
  const taskMap = <any>{};
  work.forEach((task: any) => {
    const skill = task.skill;
    if (task.end) {
      return;
    }
    if (task.start) {
      addTask(taskMap, skill, task.est); // @TODO!!!! work out how much is left from est...
      return;
    }
    addTask(taskMap, skill, task.est);
  });

  // go through all keys in keys in taskMap and see if all the hours can be sent across members
  const skills = Object.keys(taskMap);
  const skillBalance = Array<Track>();
  skills.forEach(skill => {
    const take = taskMap[skill];
    const state = fill(memberTimes, skill, take);
    memberTimes = state.memberTimes;
    const name = skill;
    const onTrack = state.remainder === 0;
    const hoursOver = state.remainder;
    skillBalance.push({
      name,
      onTrack,
      hoursOver
    });
  });
  const totalHoursLeft = memberTimes.map(m => m.left).reduce((t, c) => t + c);
  const startDate = new Date(sprint.startDate);
  const totalHours = members
    .map(details => util.hoursLeftInSprint(sprint, details, startDate))
    .reduce((t, c) => t + c);
  const unplannedHoursLeft = members
    .map(details => util.hoursLeftInSprint(sprint, details, now))
    .reduce((t, c) => t + c);

  return {
    skills: skillBalance,
    members: memberTimes,
    totalHoursLeft,
    totalHours,
    unplannedHoursLeft
  };
};

export default comp;
