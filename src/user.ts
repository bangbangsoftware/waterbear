import db from "./dbase.js";
import owner from "./user/owner.js";
import details from "./user/details.js";
import member from "./user/member.js";
import auth from "./user/auth.js";

const service = {
  ownerAndDefaults: o => owner.ownerAndDefaults(o),
  owner: (owner, prj) => owner.owner(owner, prj),

  currentProject: (user, pName) => details.currentProject(user, pName),
  loadUser: (user, project) => details.loadUser(user, project),
  updateUser: (user, project) => details.updateUser(user, project),
  replaceMember: (mList, replace) => member.replaceMember(mList, replace),
  storeMembers: members => member.storeMembers(members),
  login: (email, pw, database = db) => auth.login(email, pw, database),
  signup: (email, pw) => auth.signup(email, pw)
};

export default service;
