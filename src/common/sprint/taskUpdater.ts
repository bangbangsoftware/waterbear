import { Sprint, Task, Member, Session } from "@/waterbear3";
import store from "../../store";
import util from "../../pages/plan/util";

const assign = (sprint: Sprint, task: Task, user: Member) => {
  if (!sprint.defined) {
    console.error("Sprint is not defined cannot unassign ", task);
    return;
  }
  console.log("Assigning task", task);
  task.assignedTo = user;
  if (!task.history) {
    task.history = [];
  }
  const date = new Date();
  const action = "assigned";
  const history = {
    date,
    action,
    user
  };
  task.history.push(history);
  store.commit("sprintTask", task);
  util.storeSprintTask(task);
};

const unassign = (sprint: Sprint, task: Task, user: Member) => {
  if (!sprint.defined) {
    console.error("Sprint is not defined cannot unassign ", task);
    return;
  }
  console.log("Unassigning task", task);
  task.assignedTo = undefined;
  const date = new Date();
  const action = "unassigned";
  const history = {
    date,
    action,
    user
  };
  task.history.push(history);
  store.commit("sprintTask", task);
  util.storeSprintTask(task);
};

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

const current = (session: Session): Sprint => {
  const noSprint: boolean =
    session.project.current.sprintIndex < 0 ||
    session.project.sprints === undefined ||
    session.project.sprints.length === 0;
  return noSprint ? sprintless(session) : sprint(session);
};

export default { unassign, assign, current };
