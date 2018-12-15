import store from '../store';
import state from '../persist/state';

export interface Hour {
  name: string,
  on:boolean
}

export interface Day {
  name: string,
  day: Array<Hour>;
  night: Array<Hour>;
}

export interface Diary { off?: boolean}

export interface Member {
  nick: string;
  name: string;
  role: string;
  skills: Array<string>;
  days: Array<Day>;
  owner: boolean;
  birthday: Date | null;
  currentProject: string | null; // Not a great idea using a string as unique reference....
  asperations: Array<string>;
  holidays: Array<Date>;
  diary: Array<Diary>;
  hours?: number;
  weight?: number;
}
const birthday = new Date(2000, 7, 21, 8, 2);
const testData:Member = {
  nick: 'fred',
  name: 'fred@fred.com',
  role: 'Scrum Master',
  skills: ['vuejs', 'css', 'jenkins'],
  days: [],
  owner: false,
  birthday,
  currentProject: "tardigade",
  asperations: [],
  holidays: [],
  diary: [],
};
export {testData};

const MemberService = {
  updateMembers: (
    members: Array<Member>,
    prj: any = store.state.session.project,
  ) => {
    prj.members = members;
    return state.save(prj);
  },
  replaceMember: (memberList: Array<Member>, replacement: Member) => {
    const newList = memberList.filter(
      member => member.name !== replacement.name,
    );
    newList.push(replacement);
    return new Promise(
      async (resolve, reject): Promise<any> => {
        const prj: any = store.state.session.project;
        try {
          const p = await state.load(prj._id);
          console.log('Members owner to state -  ' + prj._id);
          store.commit('project', p);
          await MemberService.updateMembers(newList, p);
          resolve(p);
        } catch (err) {
          reject(err);
        }
      },
    );
  },
};

export {MemberService};
