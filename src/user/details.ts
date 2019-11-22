import state from "../persist/state";

import { MemberService } from "./member";
import { Member, Project } from "@/waterbear3";

const setProject = (user: Member, projectName: string) => {
  const metadata = user;
  metadata.currentProject = projectName;
  const extra = {
    metadata
  };
  return state.putUser(user.name, extra);
};

const service = {
  loadUser: (user: Member, project: Project) => {
    const memberList = project.members.filter(
      (m: Member) => m.name === user.name
    );
    if (memberList.length === 0) {
      console.error(user);
      console.error("Not in project");
      console.error(project);
    } else {
      return memberList[0];
    }
  },
  updateUser: (user: Member, project: Project): Promise<Member> => {
    return new Promise(async (resolve, reject) => {
      const memberList = project.members.filter(
        (m: Member) => m.name === user.name
      );
      if (memberList.length === 0) {
        reject("Not in project " + project.name + ".");
        return;
      }
      try {
        await MemberService.replaceMember(memberList, user);
        const m = memberList[memberList.length - 1];
        resolve(m);
      } catch (err) {
        reject(err);
      }
    });
  },
  currentProject: (user: Member, projectName: string) => {
    return new Promise<Member>((resolve, reject) => {
      console.log(
        "Setting current project for " + user.name + " to " + projectName
      );
      state
        .getUser(user.name)
        .then((usr: Member) => setProject(usr, projectName))
        .catch((err: any) => reject(err))
        .then((u: any) => resolve(u))
        .catch((err: any) => reject(err));
    });
  }
};

export default service;
