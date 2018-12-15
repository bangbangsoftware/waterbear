import store from "../../../store.js";
import Vue from "vue";
import user from "../../../user.js";
import defaults from "../../../common/setup/hours.js";
import {Member, Diary} from '../../../user/member';

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
    const element = <any> document.getElementById("teamName");
    element.focus();
  },
  methods: {
    addMember: (state:any) => {
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
        const element = <any> document.getElementById("teamName");
        element.focus();
        return errorState;
      }
      if (email.length === 0) {
        const element =<any>  document.getElementById("teamEmail");
        errorState.error = "What's their email?";
        element.focus();
        return errorState;
      }
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        const element =<any>  document.getElementById("teamEmail");
        errorState.error = "Email looks a bit wrong";
        element.focus();
        return errorState;
      }

      const newMember:Member = {
        nick: name,
        role,
        name: email,
        days: defaults(),
        skills: Array<string>(),
        owner: false,
        birthday: null,
        currentProject: null,
        asperations: Array<string>(),
        holidays: Array<Date>(),
        diary: Array<Diary>()
      };

      let newList = store.state.session.project.members;
      if (typeof newList === "undefined") {
        newList = <any>[];
      }
      newList.push(newMember);
      store.commit("addMember", newMember);
      store.commit("log", name + " has been added to the team");
      user.storeMembers(newList);
      const element =<any> document.getElementById("teamName");
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
      const vue = <any> this;
      store.state.defaults.roles.push(vue.newrole);
    }
  }
};
Vue.component("team", comp);
export default comp;
