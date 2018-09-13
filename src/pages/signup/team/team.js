import store from "../../../store.js";
import Vue from "vue";
import user from "../../../user.js";
import defaults from "../../../common/setup/hours.js";

const comp = {
  name: "team",
  data() {
    return {
      state: {
        error: "",
        teamName: "",
        teamRole: "",
        teamEmail: ""
      },
      roles: store.state.defaults.roles,
      newrole: "Add Role"
    };
  },
  mounted: () => {
    const element = document.getElementById("teamName");
    element.focus();
  },
  methods: {
    addMember: state => {
      const name = state.teamName;
      const role = state.teamRole;
      const email = state.teamEmail;
      const errorState = {
        error: "What's their name?",
        teamName: name,
        teamRole: role,
        teamEmail: email
      };
      if (name.length === 0) {
        const element = document.getElementById("teamName");
        element.focus();
        return errorState;
      }
      if (email.length === 0) {
        const element = document.getElementById("teamEmail");
        errorState.error = "What's their email?";
        element.focus();
        return errorState;
      }
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        const element = document.getElementById("teamEmail");
        errorState.error = "Email looks a bit wrong";
        element.focus();
        return errorState;
      }

      const newMember = {
        nick: name,
        role,
        name: email,
        days: defaults()
      };
      let newList = store.state.session.project.members;
      if (typeof newList === "undefined") {
        newList = [];
      }
      newList.push(newMember);
      store.commit("addMember", newMember);
      store.commit("log", name + " has been added to the team");
      user.storeMembers(newList);
      const element = document.getElementById("teamName");
      element.focus();
      const newState = {
        error: "",
        teamName: "",
        teamRole: "",
        teamEmail: ""
      };
      return newState;
    },
    addrole: function() {
      store.state.defaults.roles.push(this.newrole);
    }
  }
};
Vue.component("team", comp);
export default comp;
