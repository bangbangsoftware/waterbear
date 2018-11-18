import store from "./../store.js";
import state from "./../persist/state.js";

import util from "./util.js";

const updateOwnerInMembers = (prj, owner) => {
  let found = false;
  if (!prj.members) {
    prj.members = [owner];
  }
  const members = prj.members.map(member => {
    if (owner.name === member.name) {
      const cleanOwner = util.cleanUser(owner);
      cleanOwner.owner = true;
      found = true;
      return cleanOwner;
    }
    member.owner = false;
    return member;
  });
  if (!found) {
    owner.owner = true;
    members.push(util.cleanUser(owner));
  }
  return members;
};

const updateOwnerAndDefaults = (prj, owner) => {
  prj.members = updateOwnerInMembers(prj, owner);
  prj.defaults = store.state.defaults;
  return state.save(prj);
};

const updateOwner = (prj, owner) => {
  prj.members = updateOwnerInMembers(prj, owner);
  return state.save(prj);
};

const service = {
  ownerAndDefaults: owner => {
    return new Promise((resolve, reject) => {
      let prj = store.state.session.project;
      state
        .save(prj.id)
        .then(p => {
          prj = p;
          updateOwnerAndDefaults(prj, owner);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Owner owner to state -  " + prj.id);
          console.log("And added defaults");
          store.commit("project", prj);
          resolve(prj);
        })
        .catch(err => reject(err));
    });
  },
  owner: (owner, prj) => {
    return new Promise((resolve, reject) => {
      state
        .load(prj._id)
        .then(p => {
          prj = p;
          updateOwner(prj, owner);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Owner owner to state -  " + prj._id);
          store.commit("project", prj);
          resolve(owner);
        })
        .catch(err => reject(err));
    });
  }
};

export default service;
