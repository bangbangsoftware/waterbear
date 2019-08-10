import Vue from "vue";

import store from "../../../store";
import util from "../util";

import loginCheck from "../../../loginCheck";

import "./chart/memberChart";
import "./chart/sprintChart";
import balance from "./chart/balanceChart";
import "./chart/spareChart";

import data from "./chart/data";

const comp = {
  components: {
    balance
  },
  name: "sprint",
  beforeCreate: function() {
    loginCheck().then(() => {
      const that = <any>this;
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
      session: store.state.session
    };
  }
};

Vue.component("sprint", comp);

export default comp;
