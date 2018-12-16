import store from "../../../store";
import Vue from "vue";

const comp = {
  name: "projectSummary",
  data() {
    return {
      stages: store.state.signup.stages,
      members: store.state.members
    };
  }
};

Vue.component("projectSummary", comp);
export default comp;
