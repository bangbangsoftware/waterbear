import store from "../store.js";
import state from "../persist/state.js";

import util from "./util.js";

const updateMembers = (prj, members) => {
  prj.members = members;
  return state.save(prj);
};

const service = {
  replaceMember: (memberList, replacement) => {
    const newList = memberList.filter(
      member => member.name !== replacement.name
    );
    newList.push(util.cleanUser(replacement));
    return service.storeMembers(newList);
  },
  storeMembers: members => {
    return new Promise((resolve, reject) => {
      let prj = store.state.session.project;
      state
        .load(prj._id)
        .then(p => {
          prj = p;
          updateMembers(prj, members);
        })
        .catch(err => reject(err))
        .then(() => {
          console.log("Members owner to state -  " + prj._id);
          store.commit("project", prj);
          resolve(prj);
        })
        .catch(err => reject(err));
    });
  }
};

export default service;
