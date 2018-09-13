import gotoNext from "./direct.js";
import db from "./dbase.js";
import store from "./store.js";

const metadata = {
  nick: "",
  role: "",
  birthday: "",
  skills: [],
  asperations: [],
  days: [],
  holidays: [],
  owner: false
};

const updateOwnerAndDefaults = (prj, owner) => {
  prj.members = updateOwnerInMembers(prj, owner);
  prj.defaults = store.state.defaults;
  return db.put(prj);
};

const updateOwnerInMembers = (prj, owner) => {
  let found = false;
  if (!prj.members) {
    prj.members = [owner];
  }
  const members = prj.members.map(member => {
    if (owner.name === member.name) {
      const cleanOwner = cleanUser(owner);
      cleanOwner.owner = true;
      found = true;
      return cleanOwner;
    }
    member.owner = false;
    return member;
  });
  if (!found) {
    owner.owner = true;
    members.push(cleanUser(owner));
  }
  return members;
};

const updateOwner = (prj, owner) => {
  prj.members = updateOwnerInMembers(prj, owner);
  return db.put(prj);
};

const updateMembers = (prj, members) => {
  prj.members = members;
  return db.put(prj);
};

const setProject = (user, projectName) => {
  const metadata = cleanUser(user);
  metadata.currentProject = projectName;
  const extra = {
    metadata
  };
  return db.putUser(user.name, extra);
};

const cleanUser = user => {
  const clean = metadata;
  for (let key in metadata) {
    clean[key] = user[key];
  }
  clean.name = user.name;
  return clean;
};

const service = {
  ownerAndDefaults: owner => {
    return new Promise((resolve, reject) => {
      let prj = store.state.session.project;
      db.get(prj.id)
        .then(p => {
          prj = p;
          updateOwnerAndDefaults(prj, owner);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Owner owner to db -  " + prj.id);
          console.log("And added defaults");
          store.commit("project", prj);
          resolve(prj);
        })
        .catch(err => reject(err));
    });
  },
  loadUser: (user, project) => {
    const memberList = project.members.filter(
      member => member.name === user.name
    );
    if (memberList.length === 0) {
      console.error(user);
      console.error("Not in project");
      console.error(project);
    } else {
      return memberList[0];
    }
  },
  updateUser: (user, project) => {
    return new Promise((resolve, reject) => {
      const memberList = project.members.filter(
        member => member.name === user.name
      );
      if (memberList.length === 0) {
        reject("Not in project " + project.name + ".");
      } else {
        service
          .replaceMember(memberList, user)
          .then(list => {
            const member = list[list.length] - 1;
            resolve(member);
          })
          .catch(err => reject(err));
      }
    });
  },
  owner: (owner, prj) => {
    return new Promise((resolve, reject) => {
      db.get(prj._id)
        .then(p => {
          prj = p;
          updateOwner(prj, owner);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Owner owner to db -  " + prj._id);
          store.commit("project", prj);
          resolve(owner);
        })
        .catch(err => reject(err));
    });
  },
  replaceMember: (memberList, replacement) => {
    const newList = memberList.filter(
      member => member.name !== replacement.name
    );
    newList.push(cleanUser(replacement));
    return service.storeMembers(newList);
  },
  storeMembers: members => {
    return new Promise((resolve, reject) => {
      let prj = store.state.session.project;
      db.get(prj._id)
        .then(p => {
          prj = p;
          updateMembers(prj, members);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Members owner to db -  " + prj._id);
          store.commit("project", prj);
          resolve(prj);
        })
        .catch(err => reject(err));
    });
  },
  login: (email, pw, database = db) => {
    return new Promise((resolve, reject) => {
      console.log("About to logout then in");
      console.log(database);
      database
        .logOut()
        .then(database.logIn(email, pw))
        .catch(err => reject(err))
        .then(() =>
          gotoNext({
            name: email,
            db: database
          })
        )
        .catch(err => reject(err))
        .then(here => resolve(here))
        .catch(err => reject(err));
    });
  },
  signup: (email, pw) => {
    return db.signup(email, pw, {
      metadata
    });
  },
  currentProject: (user, projectName) => {
    return new Promise((resolve, reject) => {
      console.log(
        "Setting current project for " + user.name + " to " + projectName
      );
      db.getUser(user.name)
        .then(usr => setProject(usr, projectName))
        .catch(err => reject(err))
        .then(u => resolve(u))
        .catch(err => reject(err));
    });
  }
};

export default service;
