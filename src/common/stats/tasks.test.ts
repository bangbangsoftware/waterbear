import tasks from "./tasks";
import dataOne from "../test.data";
import { Member, Task } from '@/waterbear3';

const task = <Task>{
  name: "start button",
  desc: "Make the start button do something",
  est: 10,
  skill: "vue",
  valid: true,
  start: new Date(2018, 7, 21, 12, 20, 0, 0),
  id:1,
  storyIndex : 1,
  error: "",
  blockers: [], 
  history: []
};

describe("tasks.test.js: How is a member doing", () => {
  it("should describe started task by hours", () => {
    const data = dataOne();
    const user = <Member> data.member;
    const nowDate = new Date(2018, 7, 22, 13, 10, 0, 0);
    const state = tasks.taskState(task, user, nowDate);
    expect(state.done).toBe(9);
    expect(state.left).toBe(1);
    expect(state.finished).toBe(false);
  });

  it("should describe started task by hours over", () => {
    const data = dataOne();
    const user = data.member;
    const now = new Date(2018, 7, 22, 18, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(13);
    expect(state.left).toBe(-3);
    expect(state.finished).toBe(false);
    expect(state.paused).toBe(false);
  });

  it("should describe started task with blockers", () => {
    const data = dataOne();
    const user = data.member;
    task.blockers = [
        {
          why: "server down",
          hours: 3
        },
        {
          why: "Bee's in the office",
          hours: 3
        }
      ];
    const now = new Date(2018, 7, 22, 18, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(7);
    expect(state.left).toBe(3);
    expect(state.finished).toBe(false);
    expect(state.paused).toBe(false);
  });

  it("should describe started task with blockers", () => {
    const data = dataOne();
    const user = data.member;
    task.end = new Date(2018, 7, 22, 18, 20, 0, 0);
    task.paused =  new Date(2018, 7, 22, 13, 10, 0, 0);
    const now = new Date(2018, 7, 22, 18, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(7);
    expect(state.left).toBe(3);
    expect(state.finished).toBe(true);
    expect(state.paused).toBe(false);
  });

  // Tasks can be abandoned tasks for any reason including breaking down that task into multiple tasks....
  it("should describe an abandoned task by hours over", () => {
    const data = dataOne();
    const user = data.member;
    task.blockers = [];
    task.abandoned = { hoursWasted:4, reason: "on fire"};
    const now = new Date(2018, 7, 22, 18, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(4);
    expect(state.left).toBe(0);
    expect(state.finished).toBe(true);
    expect(state.paused).toBe(false);
    expect(state.abandoned).toBe(true);
  });

  it("should describe paused task by hours", () => {
    const data = dataOne();
    const user = data.member;
    task.abandoned = undefined;
    task.paused = new Date(2018, 7, 22, 13, 10, 0, 0);
    const now = new Date(2018, 7, 22, 18, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(9);
    expect(state.left).toBe(1);
    expect(state.finished).toBe(false);
    expect(state.paused).toBe(true);
  });

  it("Should know how which tasks have not started", () => {
    const data = dataOne();
    const taskData = tasks.tasksNotStarted(data.sprint);
    expect(taskData.est).toBe(10);
    expect(taskData.qty).toBe(2);
    expect(taskData.tasks[0].status).toBe("todo");
  });

  xit("should describe finished task by hours over ", () => {
    const data = dataOne();
    const user = data.member;
    task.paused = undefined;
    task.end = new Date(2018, 7, 22, 18, 20, 0, 0);
    const now = new Date(2018, 7, 22, 13, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(13);
    expect(state.left).toBe(-3);
    expect(state.finished).toBe(true);
    expect(state.paused).toBe(false);
  });

  it("should describe finished task by hours under ", () => {
    const data = dataOne();
    const user = data.member;
    const now = new Date(2018, 7, 22, 13, 10, 0, 0);
    const state = tasks.taskState(task, user, now);
    expect(state.done).toBe(7);
    expect(state.left).toBe(3);
    expect(state.finished).toBe(true);
    expect(state.paused).toBe(false);
  });

  it("should describe skills hours to do ", () => {
    const data = dataOne();
    const skillBalance = tasks.skillHoursLeft(data.sprint);
    expect(skillBalance.length).toBe(1);
    const skill = skillBalance[0];
    expect(skill.name).toBe("bang");
    expect(skill.hours).toBe(10);
  });
});
