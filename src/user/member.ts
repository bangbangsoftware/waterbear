import store from "../store";
import state from "../persist/state";
import { Member, Project } from "@/waterbear3";

const birthday = new Date(2000, 7, 21, 8, 2);
const testData: Member = {
  nick: "fred",
  name: "fred@fred.com",
  role: "Scrum Master",
  skills: ["vuejs", "css", "jenkins"],
  days: [],
  owner: false,
  birthday,
  currentProject: "tardigade",
  asperations: [],
  holidays: [],
  diary: [],
  picked: false
};
export { testData };

const MemberService: any = {
  updateMembers: (
    members: Array<Member>,
    prj: Project = <Project>(<unknown>store.state.session.project)
  ) => {
    prj.members = members;
    return state.save(prj);
  },
  replaceMember: (memberList: Array<Member>, replacement: Member) => {
    const newList = memberList.filter(
      member => member.name !== replacement.name
    );
    newList.push(replacement);
    return new Promise(
      async (resolve, reject): Promise<any> => {
        const prj: Project = <Project>(<unknown>store.state.session.project);
        try {
          const p = await state.load(prj._id);
          console.log("Members owner to state -  " + prj._id);
          store.commit("project", p);
          await MemberService.updateMembers(newList, p);
          resolve(p);
        } catch (err) {
          reject(err);
        }
      }
    );
  }
};

export { MemberService };
