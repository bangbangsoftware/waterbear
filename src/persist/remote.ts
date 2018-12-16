import db from "../dbase";

const remote = {
        save: (project:any) => db.put(project),
  user: (name: string, data:any) => {
    return db.putUser(name, data);
  }
};

export default remote;
