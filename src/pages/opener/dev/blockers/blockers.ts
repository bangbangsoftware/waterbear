import store from "../../../../store";
import Vue from "vue";
import check from "../../../../loginCheck";

const comp = {
  name: "blockers",
  beforeCreate: function() {
    check();
  },
  data: function() {
    const session = store.state.session;
    const project = session.project;
    const defaults = <any>project.defaults;
    const reasons =
      defaults.blockers === undefined
        ? ["broken machine", "vague requirement"]
        : defaults.blockers;
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
    onSelect(value: string) {
      const that = <any>this;
      that.value = value;
    },
    onChange(value: string) {
      const that = <any>this;
      that.value = value;
      console.log("changed " + that.value);
    },
    post(blocker: any) {
      console.log("posted " + blocker);
    }
  }
};

Vue.component("blockers", comp);

export default comp;
