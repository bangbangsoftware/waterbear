import store from "../../../store.js";
import Vue from "vue";
import template from "./pick.html";

import check from "../../../loginCheck.js";

const comp = {
  name: "opendev",
  beforeCreate: function() {
    check();
  },
  template,
  data: function() {
    return {
      session: store.state.session
    };
  },
  methods: {}
};

Vue.component("pick-work", comp);

export default comp;
