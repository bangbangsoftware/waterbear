import is from "../valid/validSprint";
import util from "../util";
import tasks from "./tasks";
import contingency from "./contingency";
import { Member} from '../../user/member';

const getAssignedTasks = (taks:Array<any>, user:Member) => {
  return taks.filter(t => t.assignedTo && t.assignedTo.name === user.name);
};

const comp = {
  contingency: (sprint:any, members:Array<any>, now = new Date()) => {
    // skillBalance
    const all = tasks.allTasks(sprint);
    return contingency(sprint, members, now, all);
  },
  tasksDonePercent: (sprint:any) => tasks.tasksDonePercentage(sprint),
  state: (sprint:any, user:Member, now = new Date()) => {
    const fail = is.invalid(sprint, now);
    if (fail) {
      return fail;
    }
    const all = tasks.allTasks(sprint);

    // maybe all of this should be done on the controllers
    const userTasks = getAssignedTasks(all, user);
    if (!userTasks.length) {
      return {
        state: "You have no tasks",
        description: "",
        needTask: true
      };
    }
    // @TODO describe all current tasks, if more than one - maybe comment, decribe the blockers
    // paused
    return {};
  },
  hoursLeft: (sprint:any, members: Array<Member>, now = new Date()) => {
    return members
      .map(user => util.hoursLeftInSprint(sprint, user, now))
      .reduce((t, c) => t + c);
  },
  tasksStat: (tsks:Array<any>) => {
    return {
      qty: tsks.length,
      est: tsks.map(t => t.est).reduce((t, c) => t + c),
      tsks
    };
  }
};
export default comp;
// impact * cost * confidence / time = score
