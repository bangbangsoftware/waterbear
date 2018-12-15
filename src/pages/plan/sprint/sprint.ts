import Vue from "vue";

import store from "../../../store.js";
import util from "../util.js";

import loginCheck from "../../../loginCheck.js";

import "./chart/memberChart.js";
import "./chart/sprintChart.js";
import balance from "./chart/balanceChart.js";
import "./chart/spareChart.js";

import data from "./chart/data.js";

const comp = {
  components: {
    balance
  },
  name: "sprint",
  beforeCreate: function() {
    loginCheck().then(() => {
      const that = <any> this;
      const id = parseInt(that.$route.params.id);
      console.log(new Date() + " sprint planning -#" + id);
      if (id > -1) {
        store.commit("selectSprint", id);
      }
      store.commit("planState", "sprint");
      store.commit("sprintSkills");
      const state = util.next(store.state.session);
      store.commit("planState", state);
      data.refresh();
    });
  },
  data: () => {
    return {
      session: store.state.session,
      project: store.state.session.project
    };
  }
};

Vue.component("sprint", comp);

export default comp;