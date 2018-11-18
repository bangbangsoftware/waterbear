import store from "./store.js";

const error = err => console.error(err);
const name = "waterbear";
const remoteCoach = store.state.session.couchURL + name;
const pouchOpts = {
  skipSetup: true,
  live: true
};
import PouchDB from "pouchdb";
import auth from "pouchdb-authentication";
PouchDB.plugin(auth);

const db =
  typeof PouchDB.plugin === Function
    ? new PouchDB(remoteCoach, pouchOpts, error)
    : PouchDB(remoteCoach, pouchOpts, error);
export default db;
