import store from "../../../store";
import user from "../../../user";
import Vue from "vue";

const register = (proj: any) => {
  console.log("user....");
  const state = <any>store.state;
  user.currentProject(state.session.user, proj.id);
  store.commit("project", proj);
  store.commit("log", proj.id + " project has begun");
  store.commit("stage", {
    name: proj.id
  });
};

const oops = (err: any, name: string) => {
  console.error(err);
  const nameElement = <any>document.getElementById("projectName");
  nameElement.focus();
  let error = err.error + " " + err.reason + " (" + err.status + ")";
  if (err.status === 409) {
    error = name + " is already in use";
  } else if (err.status === 404) {
    error =
      "couchDB (" +
      store.state.session.couchURL +
      ') has no "waterbear" databse';
  }
  store.commit("error", error);
  return error;
};

const comp = {
  name: "project",
  data() {
    return {
      projectName: "",
      projectDesc: "",
      error: "",
      session: store.state.session
    };
  },
  mounted: () => {
    store.commit("error", "");
    const element = <any>document.getElementById("projectName");
    element.focus();
  },
  methods: {
    project: (name: string, desc: string) => {
      if (name.length === 0) {
        const element = <any>document.getElementById("projectName");
        element.focus();
        return "Missing project name";
      }
      if (desc.length === 0) {
        const element = <any>document.getElementById("projectDesc");
        element.focus();
        return "Missing project description";
      }
      const project = {
        _id: name,
        description: desc
      };
      store.state.db
        .put(project)
        .then((prj: any) => register(prj))
        .catch((err: any) => oops(err, name));
      return "";
    }
  }
};
Vue.component("project", comp);
export default comp;
