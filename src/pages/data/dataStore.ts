import { Hour, State, Time, Member, Day } from "@/waterbear3";

const nextState = (hour: Hour) => {
  if (hour.state !== undefined && hour.state === "on") {
    return "off";
  }
  if (hour.state === undefined || hour.state === "wfh") {
    return "on";
  }
  return "wfh";
};

const toggle = (hour: Hour) => {
  const name = hour.label ? hour.label : hour.name;
  hour.label = name;
  hour.state = nextState(hour);
  hour.name = hour.state === "off" ? name : hour.state;
  hour.on = hour.state === "on" || hour.state === "wfh";
  return hour;
};

// @TODO the hour is the index not the value needs remapping where restoring the label
export default {
  nick: (state: State, name: string) => {
    state.session.user.nick = name;
  },
  toggleNight: (state: State, time: Time) => {
    const oldHour = state.session.user.days[time.day].night[time.hour];
    //    const hour = toggle(oldHour, time);
    const hour = toggle(oldHour);
    state.session.user.days[time.day].night[time.hour] = hour;
    state.session.change = time;
    return hour;
  },
  toggleDay: (state: State, time: Time) => {
    const oldHour = state.session.user.days[time.day].day[time.hour];
    //    const hour = toggle(oldHour, time);
    const hour = toggle(oldHour);
    state.session.user.days[time.day].day[time.hour] = hour;
    state.session.change = time;
    return hour;
  },
  day: (state: State, days: Array<Day>) => {
    state.session.user.days = days;
  },
  addMember: (state: State, member: Member) => {
    state.members.push(member);
  },
  replaceMembers: (state: State, members: Array<Member>) => {
    state.members = members;
  },
  updateMember: (state: State, memData: any) => {
    state.members[memData.memberNo] = memData.member;
  }
};
