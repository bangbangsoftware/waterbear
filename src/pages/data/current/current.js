import store from "../../../store.js";
import Vue from "vue";

const comp = {
  name: "current",
  data: function() {
    return {
      project: store.state.session.project
    };
  },
  methods: {
    descChange: desc => {
      console.log("New nick");
      store.commit("desc", desc);
    }
  },
  beforeCreate: function() {
    const element = document.getElementById("desc");
    if (element) {
      element.focus();
    }
  }
};

Vue.component("current", comp);
export default comp;
