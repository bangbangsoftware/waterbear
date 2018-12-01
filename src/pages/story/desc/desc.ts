import store from "../../../store.js";
import Vue from "vue";

const comp = {
  name: "storyDesc",
  data: function() {
    return {
      session: store.state.session
    };
  },
  methods: {
    storeTitle: (title:string) => {
      store.commit("title", title);
    },
    storeDesc: (as:string, want:string, that:string) => {
      if (typeof as === "undefined") {
        as = "";
      }
      if (typeof want === "undefined") {
        want = "";
      }
      if (typeof that === "undefined") {
        that = "";
      }
      const desc = {
        as,
        want,
        that
      };
      store.commit("desc", desc);
    }
  }
};
Vue.component("storyDesc", comp);
export default comp;
