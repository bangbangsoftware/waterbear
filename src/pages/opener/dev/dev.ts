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

import taskUpdater from '@/common/sprint/taskUpdater';

const getSession = () => <Session>store.state.session;

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

const donetest = <any>[];

const currentTasks = () => {
  const currentSprint: Sprint = taskUpdater.current(getSession());
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
      const currentSprint = taskUpdater.current(getSession());
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
    const currentSprint = taskUpdater.current(session);
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
      taskUpdater.assign(sprint, task, that.session.user);
    },
    unassign: function(sprint: Sprint, task: Task) {
      const that = <any>this;
      taskUpdater.unassign(sprint, task, that.session.user);
    }
  }
};

Vue.component("opendev", comp);

export default comp;
