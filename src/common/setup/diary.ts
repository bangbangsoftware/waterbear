import store from "../../store";
import { Member } from "../../user/member";

import { DOW, MOY, NORMAL, OFF, DS } from "./defaults";

export interface DisplayDay {
  format: string;
  date: Date;
  newMonth: boolean | string;
  colour: string;
}

const getPostfix = (dom: number) => "th";

const comp = {
  createData: (day: number, now: Date, lastMonth: string) => {
    const dd = now.getDate();
    const mm = now.getMonth();
    const yy = now.getFullYear();
    const date = new Date(yy, mm, dd + day);
    const dom = date.getDate();
    const moy = MOY[date.getMonth()];
    const newMonth = lastMonth === moy ? false : moy;
    lastMonth = moy;
    const format = " " + DOW[date.getDay()] + " the " + dom + getPostfix(dom);
    const colour = day === 0 ? "green" : day < 0 ? "grey" : "white";
    const data: DisplayDay = {
      format,
      date,
      newMonth,
      colour
    };
    return {
      data,
      lastMonth
    };
  },

  setup: (members: Array<Member>, now = new Date()) => {
    const days = new Array<DisplayDay>();
    let lastMonth = "";
    for (let day = -5; day < 15; day++) {
      const both = comp.createData(day, now, lastMonth);
      lastMonth = both.lastMonth;
      days.push(both.data);
    }
    const project = store.state.session.project;
    if (!members || members === undefined) {
      project.members = [];
    }
    const list = JSON.parse(JSON.stringify(members));
    const membersWithDiary = comp
      .makeUnique(list, "name")
      .map((member: Member) => {
        if (member.diary) {
          return member;
        }
        member.diary = days.map(dy => {
          const ds = comp.dayState(dy.date, member.days, dy.colour);
          return ds;
        });
        return member;
      });
    return {
      days,
      members: membersWithDiary
    };
  },

  dayState: (date: Date, days: any[], colour = "white") => {
    const wd = date.getDay();
    const day = days[wd];
    const nightHours = day.night
      .map((nt: any) => (nt.on ? 1 : 0))
      .reduce((total: number, curr: number) => total + curr);
    const dayHours = day.day
      .map((dy: any) => (dy.on ? 1 : 0))
      .reduce((total: number, curr: number) => total + curr);
    const total =
      dayHours + nightHours === undefined ? 0 : dayHours + nightHours;
    if (total === 0) {
      const off = JSON.parse(JSON.stringify(DS[OFF]));
      off.date = date;
      off.hours = 0;
      off.display = total + " hours";
      return off;
    }
    const normal = JSON.parse(JSON.stringify(DS[NORMAL]));
    normal.display = total + " hours";
    // normal.hours = total + ' hours'
    normal.hours = total;
    normal.colour = colour;
    normal.date = date;
    return normal;
  },

  today: (dateString: string) => {
    const now = new Date();
    const d = new Date(dateString);
    if (now.getDate() !== d.getDate()) {
      return false;
    }
    if (now.getMonth() !== d.getMonth()) {
      return false;
    }
    if (now.getFullYear() !== d.getFullYear()) {
      return false;
    }
    return true;
  },

  makeUnique: (list: any[], key: string) => {
    const keys = new Array<any>();
    return list.filter(item => {
      if (keys.indexOf(item[key]) > -1) {
        console.log("conflict:" + item[key]);
        return false;
      }
      keys.push(item[key]);
      return true;
    });
  }
};

export default comp;
