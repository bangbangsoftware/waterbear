import util from "../util";
import { Member } from "../../user/member";

const getTasksOfStatus = (sprint: any, status: string) => {
  const tasks = comp.allTasks(sprint);
  return tasks.filter((t: any) => t.status && t.status === status);
};
const rangeState = (
  current: Date,
  end: Date,
  user: Member,
  results: number
): number => {
  const next = nextDay(current, 1, end.getHours(), end.getMinutes());
  if (next.getTime() > end.getTime()) {
    return results;
  }
  const state = util.currentHours(next, user);
  const newResults = results + state.done;

  return rangeState(next, end, user, newResults);
};

const nextDay = (
  current: Date,
  plus = 1,
  hh = current.getHours(),
  mins = current.getMinutes()
) => {
  const dd = current.getDate() + plus;
  const mm = current.getMonth();
  const yy = current.getFullYear();
  return new Date(yy, mm, dd, hh, mins, 0, 0);
};

const comp = {
  allTasks: (sprint: any) => {
    const tasks = <any>[];
    if (!sprint.list) {
      return tasks;
    }
    const storiesWithTasks = sprint.list.filter((story: any) => story.tasks);
    storiesWithTasks.forEach((story: any) => {
      const storyTasks = story.tasks.map((t: any) => {
        t.storyIndex = story.index;
        return t;
      });
      tasks.push(...storyTasks);
    });
    return tasks;
  },
  exists: (what: any) => {
    if (what === undefined) {
      return false;
    }
    if (what === null) {
      return false;
    }
    if (!what) {
      return false;
    }
    return true;
  },
  doing: (assignedTo: string) => {
    return comp.exists(assignedTo);
  },
  mine: (assignedTo: string, user: Member) => {
    if (!comp.doing(assignedTo)) {
      return false;
    }
    return assignedTo === user.name;
  },
  taskState: (task: any, user: Member, now = new Date()) => {
    const skilled = user.skills
      ? user.skills.filter(s => s === task.skill).length > 0
      : false;
    const start = task.start;
    const abandoned = comp.exists(task.abandoned);
    const finished = comp.exists(task.end);
    const paused = comp.exists(task.paused) && !finished && !abandoned;
    const result = {
      skilled,
      done: 0,
      left: parseInt(task.est),
      finished,
      paused,
      reason: null,
      abandoned
    };
    if (abandoned) {
      result.finished = true;
      result.paused = false;
      result.left = 0;
      result.done = task.abandoned.hoursWasted;
      result.reason = task.abandoned.reason;
      return result;
    }

    if (!start) {
      return result;
    }
    const until = result.finished
      ? task.end
      : result.paused
        ? task.paused
        : now;
    const blocked = task.blockers
      ? task.blockers
          .map((blocker: any) => blocker.hours)
          .reduce((t: number, c: number) => t + c)
      : 0;
    const state = util.currentHours(start, user);
    const today = util.today(start, until);
    if (today) {
      result.done = state.done - blocked;
      result.left = task.est - result.done;
      return result;
    }

    const workDone = rangeState(start, until, user, state.left);
    result.done = workDone - blocked;
    result.left = task.est - result.done;
    return result;
  },
  skillHoursLeft: (sprint: any) => {
    // ??? const tasks = sprint.tasks
    const mapper = <any>{};
    const notStartedHours = comp.allTasks(sprint).filter((t: any) => !t.start);
    notStartedHours.forEach((t: any) => {
      const qty = mapper[t.skill];
      mapper[t.skill] = qty === undefined ? t.est : qty + t.est;
    });
    comp
      .allTasks(sprint)
      .filter((t: any) => t.start && !t.end)
      .forEach((task: any) => {
        // ???? const state = comp.taskState(task, task.assignedTo, now)
        const qty = mapper[task.skill];
        mapper[task.skill] = qty === undefined ? task.est : qty + task.est;
      });
    const keys = Object.keys(mapper);
    return keys.map(k => {
      return {
        name: k,
        hours: mapper[k]
      };
    });
  },
  endDate: (sprint: any) => {
    const date = new Date(sprint.startDate);
    date.setDate(date.getDate() + sprint.days);
    return date;
  },
  tasksNotStarted: (sprint: any) => {
    return comp.tasksStat(getTasksOfStatus(sprint, "todo"));
  },
  tasksOnGoing: (sprint: any) => {
    return comp.tasksStat(getTasksOfStatus(sprint, "ongoing"));
  },
  tasksCompleted: (sprint: any) => {
    return comp.tasksStat(getTasksOfStatus(sprint, "done"));
  },
  tasksStat: (tasks: any) => {
    return {
      qty: tasks.length,
      est: tasks.map((t: any) => t.est).reduce((t: number, c: number) => t + c),
      tasks
    };
  },
  taskToDo: (tasks: Array<any>) => {
    // @TODO should this use status????
    return tasks.filter(t => !comp.doing(t.assignedTo));
  },
  myTasks: (tasks: Array<any>, user: Member) => {
    // @TODO should this use status????
    return tasks.filter(t => comp.mine(t.assignedTo, user));
  },
  tasksDoing: (tasks: Array<any>) => {
    // @TODO should this use status????
    return tasks.filter(t => comp.doing(t.assignedTo));
  },
  tasksDone: (tasks: Array<any>) => {
    // @TODO should this use status????
    return tasks.filter(t => {
      // const state = comp.taskState(t) // @TODO THIS SHOULD HAVE USER?????!!!!
      // return state.finished
      return t.finished;
    });
  },
  tasksDonePercentage: (sprint: any) => {
    const allTasks = comp.allTasks(sprint);
    const all = allTasks.length;
    const done = comp.tasksDone(allTasks).length;
    const one = all / 100;
    return done * one;
  }
};
export default comp;
// impact * cost * confidence / time = score
