import Vue from "vue";

import "./select.css";

import store from "../../../store";
import util from "../util";
//import moment from "moment";
import dateFns from "date-fns";
import { Sprint } from "@/waterbear3";

Vue.filter("formatDate", function(value: any) {
  if (!value) {
    return "";
  }
  //  return moment(String(value)).format("DD MMM YYYY");
  const d = dateFns.parse(String(value));
  return dateFns.format(d, "DD MMM YYYY");
});

const getTime = (date: string) => {
  return {
    hours: parseInt(date.substring(0, 2)),
    minutes: parseInt(date.substring(3, 5))
  };
};

const comp = {
  name: "selectSprint",
  data: () => {
    const sprint: Sprint =
      <any>store.state.session.project.sprints === undefined
        ? { startDate: new Date(), startTime: "", name: "", list: [] }
        : store.state.session.project.sprints[
            store.state.session.project.current.sprintIndex
          ];
    sprint.startDate = new Date(sprint.startDate);
    //    sprint.startDateString = "" + sprint.startDate;
    sprint.startTime =
      sprint.startDate.getHours() + ":" + sprint.startDate.getMinutes();
    return {
      project: store.state.session.project,
      session: store.state.session,
      sprint,
      editName: false,
      dialog: false
    };
  },
  methods: {
    deselect: () => {
      store.commit("selectSprint", -1);
      store.commit("planState", "sprintSelect");
    },
    startSprint: function() {
      store.commit("planState", "sprintSelect");
      const that = <any>this;
      that.dialog = false;
      const i = store.state.session.project.current.sprintIndex;
      const sprint = <any>store.state.session.project.sprints[i];
      const time = getTime(sprint.startTime);
      // @TODO This looks wrong... dates... grrrrr
      sprint.startDate.setHours(time.hours + 1);
      sprint.startDate.setMinutes(time.minutes);
      util.updateSprints();
    },
    toggleNameEdit: function() {
      const that = <any>this;
      that.editName = !that.editName;
      store.commit("planState", "sprintCreate");
    },
    removeFromSprint: function(story: any, index: any) {
      store.commit("takeFromSprint", index);
      util.updateSprints();
    }
  }
};

Vue.component("selectSprint", comp);
export default comp;
