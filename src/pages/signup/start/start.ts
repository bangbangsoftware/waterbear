import Vue from "vue";
// import Password from "vue-password-strength-meter";
import "vue-password-strength-meter";

import store from "../../../store";
import db from "../../../dbase";
import user from "../../../user";

import "./start.css";

const oops = (err:any, email:string, where:string) => {
  if (typeof err === "undefined") {
    return "";
  }
  console.error(where);
  console.error(err);
  let error =
    err.error === undefined
      ? err
      : err.error + " " + err.reason + " (" + err.status + ")";
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

const register = (email:string) => {
  if (store.state.session.error) {
    console.error("Can't register due to :" + store.state.session.error);
    return;
  }
  const me = {
    name: email
  };
  console.log("Start login...");
  console.log(me);
  store.commit("log", email + " is a new owner");
  store.commit("db", db);
  store.commit("user", me);
  store.commit("stage", me);
};

const signInReg = (email:string, pw:string) => {
  user
    .signup(email, pw)
    .catch((err:any) => oops(err, email, "signup"))
    .then(() => db.logIn(email, pw))
    .catch((err:any) => oops(err, email, "login"))
    .then(() => register(email));
};

const comp = {
  name: "start",
//  components: {
//    Password
//  },
  data() {
    return {
      error: "",
      email: "",
      pw: "",
      session: store.state.session
    };
  },
  create: () => {
    const element = <any> document.getElementById("email");
    element.focus();
  },
  methods: {
    createUser: (email:string, pw:string) => {
      store.commit("error", "");
      if (email.length === 0) {
        const emailElement = document.getElementById("email");
        if (emailElement) {
          emailElement.focus();
        }
        return oops("Missing email", "", "no email");
      }
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        const emailElement = document.getElementById("email");
        if (emailElement) {
          emailElement.focus();
        }
        return oops("Email looks a bit wrong", "", "bad email");
      }
      if (pw.length === 0) {
        const pwElement = document.getElementById("password");
        if (pwElement) {
          pwElement.focus();
        }
        return oops("Missing password", "", "no password");
      }
      db.logOut()
        .then(() => signInReg(email, pw))
        .catch((err:any) => {
          console.error(err);
          signInReg(email, pw);
        });
    }
  }
};

Vue.component("start", comp);
export default comp;
