import Vue from "vue";

import "./select.css";

import store from "../../../store.js";
import util from "../util.js";
//import moment from "moment";
import dateFns from "date-fns";

Vue.filter("formatDate", function(value) {
  if (!value) {
    return "";
  }
  //  return moment(String(value)).format("DD MMM YYYY");
  const d = dateFns.parse(String(value));
  return dateFns.format(d, "DD MMM YYYY");
});

const getTime = date => {
  return {
    hours: parseInt(date.substring(0, 2)),
    minutes: parseInt(date.substring(3, 5))
  };
};

const comp = {
  name: "selectSprint",
  data: () => {
    const sprint =
      store.state.session.project.sprints === undefined
        ? {}
        : store.state.session.project.sprints[
            store.state.session.project.current.sprintIndex
          ];
    sprint.startDate = new Date(sprint.startDate);
    sprint.startDateString = sprint.startDate;
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
      this.dialog = false;
      const i = store.state.session.project.current.sprintIndex;
      const time = getTime(store.state.session.project.sprints[i].startTime);
      // @TODO This looks wrong... dates... grrrrr
      store.state.session.project.sprints[i].startDate.setHours(time.hours + 1);
      store.state.session.project.sprints[i].startDate.setMinutes(time.minutes);
      util.updateSprints();
    },
    toggleNameEdit: function() {
      this.editName = !this.editName;
      store.commit("planState", "sprintCreate");
    },
    removeFromSprint: function(story, index) {
      store.commit("takeFromSprint", index);
      util.updateSprints();
    }
  }
};

Vue.component("selectSprint", comp);
export default comp;
