import Vue from "vue";

import store from "../../store";
import user from "../../user";

import "./login.css";

import alreadyLoggedIn from "../../loginCheck";
import direct from "../../direct";

const error = (err:any) => console.error(err);
const name = "waterbear";
const pouchOpts = {
  skipSetup: true,
  live: true
};
import PouchDB from "pouchdb";
PouchDB.plugin(require("pouchdb-authentication"));

const oops = (err:any, email:string, where:string) => {
  console.error(where);
  console.error(err);
  let error = err.error + " " + err.reason + " (" + err.status + ")";
  if (err.status === 0 && err.name === "unknown") {
    error = "Cannot connect to database";
  }
  if (err.status === 404) {
    error = "The login failed ";
  }
  if (err.status === 409) {
    error = email + " is already in use";
  }
  const emailElement = document.getElementById("email");
  if (emailElement) {
    emailElement.focus();
  }
  store.commit("error", error);
  return error;
};

const comp = {
  name: "login",
  data() {
    return {
      error: "",
      email: "",
      pw: "",
      session: store.state.session
    };
  },
  beforeCreate: function() {
    alreadyLoggedIn(false)
      .then(() => {
        console.log("Already Logged in");
        const that = <any> this;
        direct(that.session.user).then(go => {
          if (window) {
            window.location.href = "#/" + go;
          }
        });
      })
      .catch(() => {
        console.log("NOT already Logged in");
      });
  },
  create: () => {
    store.commit("loaded", false);
    const element = <any> document.getElementById("email");
    element.focus();
  },
  methods: {
    login: function(email:string, pw:string) {
      if (email.length === 0) {
        const emailElement = document.getElementById("email");
        if (emailElement) {
          emailElement.focus();
        }
        return "Missing email";
      }
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        const emailElement = document.getElementById("email");
        if (emailElement) {
          emailElement.focus();
        }
        return "Email looks a bit wrong";
      }
      if (pw.length === 0) {
        const pwElement = document.getElementById("password");
        if (pwElement) {
          pwElement.focus();
        }
        return "Missing password";
      }
      const that = <any> this;
      const remoteCoach = that.session.couchURL + name;
      const db =
//        typeof PouchDB.plugin === FunctionA?
//           new PouchDB(remoteCoach, pouchOpts, error);
           new PouchDB(remoteCoach);
//           :PouchDB(remoteCoach, pouchOpts, error);
      store.commit("db", db);
      user
        .login(email, pw, db)
        .then(here => {
          window.location.href = "#/" + here;
        })
        .catch(err => oops(err, email, err));
    }
  }
};

Vue.component("login", comp);
export default comp;
