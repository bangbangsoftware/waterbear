import store from "../../../../store.js";
import Vue from "vue";
import check from "../../../../loginCheck.js";

const comp = {
  name: "blockers",
  beforeCreate: function() {
    check();
  },
  data: function() {
    const session = store.state.session;
    const project = session.project;
    const reasons =
      project.defaults.blockers === undefined
        ? ["broken machine", "vague requirement"]
        : project.defaults.blockers;
    /**        
            const reasons = [
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
              "eight",
              "nine",
              "ten"
            ];
        **/
    const blocker = "";
    return {
      session,
      project,
      reasons,
      blocker
    };
  },
  methods: {
    onSelect(value) {
      this.value = value;
    },
    onChange(value) {
      this.value = value;
      console.log("changed " + this.value);
    },
    post(blocker) {
      console.log("posted " + blocker);
    }
  }
};

Vue.component("blockers", comp);

export default comp;
