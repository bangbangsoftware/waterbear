const nextState = (hour: any) => {
  if (hour.state !== undefined && hour.state === "on") {
    return "off";
  }
  if (hour.state === undefined || hour.state === "wfh") {
    return "on";
  }
  return "wfh";
};

const toggle = (hour: any) => {
  const name = hour.label ? hour.label : hour.name;
  hour.label = name;
  hour.state = nextState(hour);
  hour.name = hour.state === "off" ? name : hour.state;
  hour.on = hour.state === "on" || hour.state === "wfh";
  return hour;
};

// @TODO the hour is the index not the value needs remapping where restoring the label
export default {
  nick: (state: any, name: string) => {
    state.session.user.nick = name;
  },
  toggleNight: (state: any, time: any) => {
    const oldHour = state.session.user.days[time.day].night[time.hour];
    //    const hour = toggle(oldHour, time);
    const hour = toggle(oldHour);
    state.session.user.days[time.day].night[time.hour] = hour;
    state.session.change = time;
    return hour;
  },
  toggleDay: (state: any, time: any) => {
    const oldHour = state.session.user.days[time.day].day[time.hour];
    //    const hour = toggle(oldHour, time);
    const hour = toggle(oldHour);
    state.session.user.days[time.day].day[time.hour] = hour;
    state.session.change = time;
    return hour;
  },
  day: (state: any, hours: any) => {
    if (!state.session.user.days) {
      state.session.user.days = [];
    }
    state.session.user.days.push(hours);
  },
  addMember: (state: any, member: any) => {
    state.members.push(member);
  },
  replaceMembers: (state: any, members: any) => {
    state.members = members;
  },
  updateMember: (state: any, memData: any) => {
    state.members[memData.memberNo] = memData.member;
  }
};
