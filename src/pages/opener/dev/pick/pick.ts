import store from "../../../../store.js";
import Vue from "vue";

import check from "../../../../loginCheck.js";

const comp = {
  name: "pick-work",
  beforeCreate: function() {
    check();
  },
  data: function() {
    return {
      session: store.state.session
    };
  },
  methods: {}
};

Vue.component("pick-work", comp);

export default comp;
