import store from "./../store";
import state from "./../persist/state";
import { Project, Member } from "@/waterbear3";

const updateOwnerInMembers = (prj: Project, owner: Member) => {
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

const updateOwnerAndDefaults = (prj: Project, owner: Member) => {
  prj.members = updateOwnerInMembers(prj, owner);
  prj.defaults = store.state.defaults;
  return state.save(prj);
};

const updateOwner = (prj: Project, owner: Member) => {
  prj.members = updateOwnerInMembers(prj, owner);
  return state.save(prj);
};

const service = {
  ownerAndDefaults: (owner: Member) => {
    return new Promise((resolve, reject) => {
      let prj: any = store.state.session.project;
      state
        .save(prj.id)
        .then((p: Project) => {
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
  owner: (owner: Member, prj: Project) => {
    return new Promise((resolve, reject) => {
      state
        .load(prj._id)
        .then((p: any) => {
          prj = <Project>p;
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
