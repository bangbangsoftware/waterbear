import state from "../persist/state.js";

import util from "./util.js";
import member from "./member.js";

const setProject = (user, projectName) => {
  const metadata = util.cleanUser(user);
  metadata.currentProject = projectName;
  const extra = {
    metadata
  };
  return state.putUser(user.name, extra);
};

const service = {
  loadUser: (user, project) => {
    const memberList = project.members.filter(m => m.name === user.name);
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
      const memberList = project.members.filter(m => m.name === user.name);
      if (memberList.length === 0) {
        reject("Not in project " + project.name + ".");
      } else {
        member
          .replaceMember(memberList, user)
          .then(list => {
            const m = list[list.length] - 1;
            resolve(m);
          })
          .catch(err => reject(err));
      }
    });
  },
  currentProject: (user, projectName) => {
    return new Promise((resolve, reject) => {
      console.log(
        "Setting current project for " + user.name + " to " + projectName
      );
      state
        .getUser(user.name)
        .then(usr => setProject(usr, projectName))
        .catch(err => reject(err))
        .then(u => resolve(u))
        .catch(err => reject(err));
    });
  }
};

export default service;
