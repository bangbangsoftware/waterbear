import Vue from "vue";

const comp = {
  props: ["done"],
  name: "tasklist"
};

Vue.component("tasklist", comp);

export default comp;
