import Vue from "vue";

import store from "../../store";
import beforeCreate from "../../loginCheck";

import user from "../../user";

import "./team.css";

import dairy from "../../common/setup/diary";
import util from "../../common/util";
import * as cxb from "@/waterbear3";

const comp = {
  name: "team",
  beforeCreate: function() {
    beforeCreate();
  },
  data: function() {
    const dam = dairy.setup(store.state.session.project.members);
    const members = dam.members;
    const days = dam.days;
    user.storeMembers(members);
    const showMenu = false;
    // Seperate method and should insert days if
    // they don't exist and put state on session of the team....
    const menu = store.state.menu;
    const session = store.state.session;
    const d = {
      session,
      menu,
      days,
      showMenu,
      x: 0,
      y: 0
    };
    return d;
  },
  methods: {
    /**          
    show(e:any) {
      e.preventDefault();
      this.showMenu = true;
      this.x = e.clientX;
      this.y = e.clientY;
    },
**/
    save: () => {},
    toggle: function(memberNo: number, day: any, session: any) {
      console.log("toggling from %o and %o", memberNo, day);
      const members = session.project.members;
      const member = members[memberNo];
      let currentState = member.diary[day];
      if (!currentState.hours) {
        currentState.hours = currentState.display;
      }
      const nextState = comp.cycle(currentState);
      member.diary[day] = nextState;
      const now = new Date();
      member.diary = member.diary.map((d: any) => {
        const date = new Date(d.date);
        if (d.off) {
          d.colour = "grey";
        } else if (!d.off && util.today(date)) {
          d.colour = "green";
        } else if (d.date < now) {
          d.colour = "grey";
        } else {
          d.colour = "white";
        }
        return d;
      });
      members[memberNo] = member;
      user.storeMembers(members);
      return nextState;
    }
  },
  cycle: (current: any) => {
    const next = current.state + 1 === cxb.DS.length ? 0 : current.state + 1;
    const newState = JSON.parse(JSON.stringify(cxb.DS[next]));
    newState.hours = current.hours;
    newState.date = current.date;
    if (newState.state === 0) {
      newState.display = display(newState);
    }
    return newState;
  }
};

const display = (newState: any): string => {
  if (newState.hours) {
    return newState.hours;
  }
  return newState.total === undefined ? "0 hours" : newState.total + " hours";
};

Vue.component("team", comp);
export default comp;
