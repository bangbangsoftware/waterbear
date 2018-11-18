import db from "../dbase.js";

const remote = {
  save: project => db.put(project),
  user: (name, data) => {
    return db.putUser(name, data);
  }
};

export default remote;
