import store from "../../../store";
import Vue from "vue";

import check from "../../../loginCheck";
import "./time/time.vue";
import blockers from "./blockers/blockers.vue";
import condition from "./condition/condition.vue";
import "./dev.css";
import sprintStat from "../../../common/stats/sprintStat";

import tasks from "../../../common/stats/tasks";

import util from "../../plan/util";

import tasklist from "./tasklist/tasklist.vue";
import { Member, Session, Sprint, Task, Stat } from "@/waterbear3";

const getName = (session: Session): string => {
  const owner = session.project.members.find((m: Member) => m.owner);
  if (!owner) {
    console.log("Cannot find owner");
    return "There is no sprint running or project owner?!";
  }
  return session.user.owner
    ? "You need to start a sprint!"
    : "There is no sprint running, talk to " + owner.nick;
};

const getSession = () => <Session>store.state.session;

const sprintless = (session: Session): Sprint => {
  const name = getName(session);
  const defined = false;
  const needSprint: Sprint = {
    startDate: new Date(),
    startTime: "",
    name,
    list: [],
    defined
  };
  return needSprint;
};

const sprint = (session: Session): Sprint => {
  const spt = session.project.sprints[session.project.current.sprintIndex];
  spt.defined = true;
  return spt;
};

// This is wrong it should be total member hours (100%) over hour many member hours left
const percent = (stat: Stat) => {
  const totalHours = stat.totalHours;
  const percent = totalHours / 100;
  const hoursLeft = stat.unplannedHoursLeft;
  const hoursDone = totalHours - hoursLeft;
  const percentDone = Math.round(hoursDone / percent);
  return percentDone;
  //    const start = new Date(sprint.startDate)
  //    const timeDiff = Math.abs(now.getTime() - start.getTime())
  //    const done = Math.ceil(timeDiff / (1000 * 3600 * 24))
  //    const percent = sprint.days / 100
  //    return done * percent * 100
};

const colour = (timePercent: number) =>
  timePercent < 30 ? "success" : timePercent < 70 ? "warning" : "error";

const reverseColour = (timePercent: number) =>
  timePercent > 70 ? "success" : timePercent > 30 ? "warning" : "error";

const progress = (name: string, percent: number, colour: string) => {
  return {
    name,
    percent,
    colour
  };
};

const progressList = (currentSprint: Sprint, stat: Stat) => {
  const progressList = [];
  const timePercentage = percent(stat);
  progressList.push(progress("Time", timePercentage, colour(timePercentage)));
  const taskPercent = tasks.tasksDonePercentage(currentSprint);
  progressList.push(progress("Tasks", taskPercent, reverseColour(taskPercent)));
  progressList.push(
    progress("Contingency", taskPercent, reverseColour(taskPercent))
  );
  return progressList;
};

const current = (session: Session): Sprint => {
  const noSprint: boolean =
    session.project.current.sprintIndex < 0 ||
    session.project.sprints === undefined ||
    session.project.sprints.length === 0;
  return noSprint ? sprintless(session) : sprint(session);
};

const donetest = <any>[];

const currentTasks = () => {
  const currentSprint: Sprint = current(getSession());
  const ts = tasks.allTasks(currentSprint);
  console.log("sprint", currentSprint);
  console.log("tasks", currentSprint.list.length);
  console.log("tasks", currentSprint.list);
  return ts;
};

const comp = {
  name: "opendev",
  components: {
    tasklist,
    blockers,
    condition
  },
  beforeCreate: function() {
    check();
  },
  computed: {
    tasks: function() {
      const currentSprint = current(getSession());
      const all = tasks.allTasks(currentSprint).map((task: Task, i: number) => {
        const block = task;
        block.id = i;
        block.name = task.name;
        block.status = task.assignedTo ? "Doing" : "Todo";
        return block;
      });
      return all;
    },
    todo: function() {
      const todos = tasks.taskToDo(currentTasks());
      console.log("Todos", todos.length);
      return todos;
    },
    mine: function() {
      const mine = tasks.myTasks(currentTasks(), store.state.session.user);
      console.log("mine", mine.length);
      console.log("mine", mine);
      return mine;
    },
    doing: function() {
      const doing = tasks.tasksDoing(currentTasks());
      console.log("doing", doing.length);
      return doing;
    },
    done: function() {
      return donetest;
    }
  },
  data: function() {
    const session: Session = getSession();
    console.log(session.user);
    const project = session.project;
    const members = project.members;
    const currentSprint = current(session);
    const stat = <Stat>sprintStat.contingency(currentSprint, members);
    const endDate = tasks.endDate(currentSprint).getTime();
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((endDate - now) / oneDay));
    const daysLeft = endDate < now ? -days : days;
    const stages = ["Todo", "Doing", "Done"];
    return {
      session,
      sprint: currentSprint,
      progressList: progressList(currentSprint, stat),
      stat,
      stages,
      daysLeft
    };
  },
  methods: {
    endDate: (sprint: Sprint) => tasks.endDate(sprint),
    assign: function(sprint: Sprint, task: Task) {
      const that = <any>this;
      console.log("You have selected", task);
      task.assignedTo = that.session.user.name;
      if (!task.history) {
        task.history = [];
      }
      const date = new Date();
      const action = "assigned";
      const user = that.session.user.name;
      const history = {
        date,
        action,
        user
      };
      task.history.push(history);
      store.commit("sprintTask", task);
      util.storeSprintTask(task);
    },
    unassign: function(sprint: Sprint, task: Task) {
      console.log("You have selected", task);
      task.assignedTo = undefined;
      const date = new Date();
      const action = "unassigned";
      const that = <any>this;
      const user = that.session.user.name;
      const history = {
        date,
        action,
        user
      };
      task.history.push(history);
      store.commit("sprintTask", task);
      util.storeSprintTask(task);
    }
  }
};

Vue.component("opendev", comp);

export default comp;
