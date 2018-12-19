import store from "../../../store";
import Vue from "vue";
import "./hours.css";
import defaults from "../../../common/setup/hours";

const comp = {
  name: "hours",
  data: function() {
    return {
      session: store.state.session,
      days: store.state.session.user.days
    };
  },
  beforeCreate: () => {
    const storedDays = store.state.session.user.days;
    if (typeof storedDays !== "undefined") {
      console.log("Already have default working hours");
      return;
    }
    const days = defaults();
    days.forEach(day => {
      store.commit("day", day);
    });
  },
  methods: {
    toggleDay: (day: any, hour: any) => {
      store.commit("toggleDay", {
        day,
        hour
      });
    },
    toggleNight: (day: any, hour: any) => {
      store.commit("toggleNight", {
        day,
        hour
      });
    },
    colour: (value: string) => {
      if (value === "on") {
        return "green";
      }
      if (value === "wfh") {
        return "warning";
      }
    }
  }
};
Vue.component("hours", comp);
export default comp;
