import store from "./../store";
import state from "./../persist/state";

import { Member } from "./member";

const updateOwnerInMembers = (prj: any, owner: any) => {
  let found = false;
  if (!prj.members) {
    prj.members = [owner];
  }
  const members = prj.members.map((member: Member) => {
    if (owner.name === member.name) {
      const cleanOwner = owner;
      cleanOwner.owner = true;
      found = true;
      return cleanOwner;
    }
    member.owner = false;
    return member;
  });
  if (!found) {
    owner.owner = true;
    members.push(owner);
  }
  return members;
};

const updateOwnerAndDefaults = (prj: any, owner: any) => {
  prj.members = updateOwnerInMembers(prj, owner);
  prj.defaults = store.state.defaults;
  return state.save(prj);
};

const updateOwner = (prj: any, owner: any) => {
  prj.members = updateOwnerInMembers(prj, owner);
  return state.save(prj);
};

const service = {
  ownerAndDefaults: (owner: any) => {
    return new Promise((resolve, reject) => {
      let prj: any = store.state.session.project;
      state
        .save(prj.id)
        .then((p: any) => {
          prj = p;
          updateOwnerAndDefaults(prj, owner);
        })
        .catch((err: any) => reject(err))
        .then(() => {
          console.log("Owner owner to state -  " + prj.id);
          console.log("And added defaults");
          store.commit("project", prj);
          resolve(prj);
        })
        .catch((err: any) => reject(err));
    });
  },
  owner: (owner: any, prj: any) => {
    return new Promise((resolve, reject) => {
      state
        .load(prj._id)
        .then((p: any) => {
          prj = p;
          updateOwner(prj, owner);
        })
        .catch((err: any) => reject(err))
        .then(() => {
          console.log("Owner owner to state -  " + prj._id);
          store.commit("project", prj);
          resolve(owner);
        })
        .catch((err: any) => reject(err));
    });
  }
};

export default service;
