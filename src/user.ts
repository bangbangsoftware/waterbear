import db from './dbase';
import ownerService from './user/owner';
import details from './user/details';
import {MemberService, Member} from './user/member';
import auth from './user/auth';

const service = {
  ownerAndDefaults: (o: Member) => ownerService.ownerAndDefaults(o),
  owner: (owner: Member, prj: any) => ownerService.owner(owner, prj),

  currentProject: (user: Member, pName: string) =>
    details.currentProject(user, pName),
  loadUser: (user: Member, project: any) => details.loadUser(user, project),
  updateUser: (user: Member, project: any) => details.updateUser(user, project),
  replaceMember: (mList: Array<Member>, replace: Member) =>
    MemberService.replaceMember(mList, replace),
  storeMembers: (members: Member[]) => MemberService.updateMembers(members),
  login: (email: string, pw: string, database = db) =>
    auth.login(email, pw, database),
  signup: (email: string, pw: string) => auth.signup(email, pw),
};

export default service;
