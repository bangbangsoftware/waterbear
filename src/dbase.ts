import store from "./store";
import PouchDB from "pouchdb";
import auth from "pouchdb-authentication";

const error = (err:any) => console.error(err);
const makeDB = (name = "waterbear") =>{
  const remoteCoach = (store) ? store.state.session.couchURL + name
  : 'localhost:5934/'+name;
  const pouchOpts = {
    skipSetup: true,
    live: true
  };
  PouchDB.plugin(auth);
  return new PouchDB(remoteCoach)
}


const db = makeDB();
//  typeof PouchDB.plugin === Function
  //  ? new PouchDB(remoteCoach, pouchOpts, error)
  //  : PouchDB(remoteCoach, pouchOpts, error);
export default db;
