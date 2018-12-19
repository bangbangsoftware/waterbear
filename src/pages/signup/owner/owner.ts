import store from "../../../store";
import user from "../../../user";
import Vue from "vue";
import defaults from "../../../common/setup/hours";
import { Member, Diary, Day } from "../../../user/member";

const comp = {
  name: "owner",
  data() {
    return {
      ownerName: "",
      ownerRole: "",
      roles: store.state.defaults.roles,
      error: ""
    };
  },
  mounted: () => {
    const element = <any>document.getElementById("ownername");
    element.focus();
  },
  methods: {
    owner: (nick: string, role: string) => {
      if (nick.length === 0) {
        const element = document.getElementById("ownername");
        if (element) {
          element.focus();
        }
        return "What's your name?";
      }
      const stage = <any>store.state.signup.stages[0];
      const email = stage.name;
      store.commit("log", "Hi " + nick + " (" + email + ")");
      const skills = new Array<string>();
      const asperations = new Array<string>();
      const holidays = new Array<Date>();
      const diary = new Array<Diary>();
      const owner: Member = {
        nick,
        name: email,
        role,
        skills,
        days: defaults(),
        owner: true,
        birthday: new Date(),
        currentProject: "",
        asperations,
        holidays,
        diary
      };
      user.ownerAndDefaults(owner);
      store.commit("stage", {
        name,
        email,
        role
      });
      return "";
    }
  }
};

Vue.component("owner", comp);
export default comp;
