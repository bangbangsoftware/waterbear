import util from "../util";
import { Member, Sprint, Task, Story, Blocker, Project, TaskState } from "@/waterbear3";

const getTasksOfStatus = (sprint: any, status: string) => {
  const tasks = taskService.allTasks(sprint);
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

const taskService = {
  getTask: (prj: Project, id: number) => taskService.allTask(prj).find((t:Task) => t.id === id),
  allTask: (prj: Project) =>{
    const storyInProject = prj.stories;
    const storyInSprints = prj.sprints.flatMap(sprint => sprint.list);
    const tasksInProject = storyInProject.flatMap(story => story.tasks);
    const tasksInSprints = storyInSprints.flatMap(story => story.tasks);
    return tasksInProject.concat(tasksInSprints);
  },
  allTasks: (sprint: Sprint) => {
    const tasks = new Array<Task>();
    if (!sprint.list) {
      return tasks;
    }
    const storiesWithTasks = sprint.list.filter((story: Story) => story.tasks.length > 0);
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
    return taskService.exists(assignedTo);
  },
  mine: (assignedTo: string, user: Member) => {
    if (!taskService.doing(assignedTo)) {
      return false;
    }
    return assignedTo === user.name;
  },
  getUntil: (result:TaskState, task:Task, now:Date):Date =>{
    if(result.finished && task.end){
      return task.end;
    }
    if (result.paused && task.paused){
      return task.paused;
    }
    return now;
  },
  taskState: (task: Task, user: Member, now = new Date()): TaskState => {
    const skilled = user.skills
      ? user.skills.filter(s => s === task.skill).length > 0
      : false;
    const start = task.start;
    const abandoned = taskService.exists(task.abandoned);
    const finished = taskService.exists(task.end);
    const paused = taskService.exists(task.paused) && !finished && !abandoned;
    const result = {
      skilled,
      done: 0,
      left: task.est,
      finished,
      paused,
      reason: "",
      abandoned
    };
    if (task.abandoned) {
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
    const until = taskService.getUntil(result,task,now);
    const blockedHours = task.blockers
          .map((blocker: Blocker) => blocker.hours);
    const blocked = blockedHours.reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

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
  skillHoursLeft: (sprint: Sprint) => {
    // ??? const tasks = sprint.tasks
    const mapper = <any>{};
    const notStartedHours = taskService.allTasks(sprint).filter((t: any) => !t.start);
    notStartedHours.forEach((t: any) => {
      const qty = mapper[t.skill];
      mapper[t.skill] = qty === undefined ? t.est : qty + t.est;
    });
    taskService
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
    return taskService.tasksStat(getTasksOfStatus(sprint, "todo"));
  },
  tasksOnGoing: (sprint: any) => {
    return taskService.tasksStat(getTasksOfStatus(sprint, "ongoing"));
  },
  tasksCompleted: (sprint: any) => {
    return taskService.tasksStat(getTasksOfStatus(sprint, "done"));
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
    return tasks.filter(t => !taskService.doing(t.assignedTo));
  },
  myTasks: (tasks: Array<any>, user: Member) => {
    // @TODO should this use status????
    return tasks.filter(t => taskService.mine(t.assignedTo, user));
  },
  tasksDoing: (tasks: Array<any>) => {
    // @TODO should this use status????
    return tasks.filter(t => taskService.doing(t.assignedTo));
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
    const allTasks = taskService.allTasks(sprint);
    const all = allTasks.length;
    const done = taskService.tasksDone(allTasks).length;
    const one = all / 100;
    return done * one;
  }
};
export default taskService;
// impact * cost * confidence / time = score
