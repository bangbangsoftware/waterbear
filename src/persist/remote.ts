import db from "../dbase.js";

const remote = {
        save: (project:any) => db.put(project),
  user: (name: string, data:any) => {
    return db.putUser(name, data);
  }
};

export default remote;
