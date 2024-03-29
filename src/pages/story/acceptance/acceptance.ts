import store from "../../../store";
import Vue from "vue";
import "./acceptance.css";

const comp = {
  name: "acceptance",
  data: function() {
    return {
      state: {
        newAc: "",
        session: store.state.session,
        error: ""
      }
    };
  },
  methods: {
    navigateTo: function(nav: string) {
      const vue = <any>this;
      vue.$router.go({
        path: nav
      });
    },
    addCriteria: function(ac: string) {
      if (ac && ac.length > 0) {
        store.commit("acceptance", ac);
      }

      const element = document.getElementById("newAc");
      if (element) {
        element.focus();
        const that = <any>this;
        that.state.newAc = "";
      }
      const acs = store.state.session.story.acs;
      return {
        newAc: "",
        acs,
        error: ""
      };
    },
    removeCriteria: function(acNo: number) {
      store.commit("removeAcceptance", acNo);
      const acs = store.state.session.story.acs;
      return {
        newAc: "",
        acs,
        error: ""
      };
    }
  }
};
Vue.component("acceptance", comp);
export default comp;
