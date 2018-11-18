import store from "../../store.js";

import data from "./sprint/chart/data.js";

const incompleteFilter = story =>
  story.tasks === undefined ||
  story.tasks.length === 0 ||
  story.points === undefined;
const completeFilter = story => !incompleteFilter(story);

const addTask = (p, task) => {
  const index = store.state.session.story.index;
  const storyTasks = p.stories[index].tasks;
  const allTasks = storyTasks === undefined ? [] : storyTasks;
  const tasks = allTasks.filter(t => t.name !== task.name);
  tasks.push(task);
  p.stories[index].tasks = tasks;
  const db = store.state.db;
  return db.put(p);
};

const addSprintTask = (p, task) => {
  const sprintIndex = p.current.sprintIndex;
  const sprint = p.sprints[sprintIndex];
  const story = sprint.list[task.storyIndex];
  const storyTasks = story.tasks;
  const allTasks = storyTasks === undefined ? [] : storyTasks;
  const tasks = allTasks.filter(t => t.name !== task.name);
  tasks.push(task);
  story.tasks = tasks;
  p.sprints[sprintIndex].list[task.storyIndex] = story;
  const db = store.state.db;
  return db.put(p);
};

export default {
  storeSprintTask: task => {
    const prj = store.state.session.project;
    console.log("Updating task in sprint");
    console.log(prj);
    const db = store.state.db;
    db.get(prj._id)
      .then(p => addSprintTask(p, task))
      .catch(err => console.error(err));
  },
  storeTask: task => {
    const prj = store.state.session.project;
    console.log("Adding task to story");
    console.log(prj);
    const db = store.state.db;
    db.get(prj._id)
      .then(p => addTask(p, task))
      .catch(err => console.error(err));
  },
  next: session => {
    console.log("Next in plan for project...");
    console.log(session.project);
    if (!session.project.sprints || session.project.sprints.length < 1) {
      return "sprintCreate";
    } else if (session.project.current.sprintIndex === -1) {
      return "sprintSelect";
    } else {
      return "sprint";
    }
  },
  updateSprints: () => {
    const prj = store.state.session.project;
    console.log("Adding sprint");
    console.log(prj);
    data.refresh();
    const db = store.state.db;
    db.get(prj._id)
      .then(p => {
        p.current = {
          sprintIndex: store.state.session.project.current.sprintIndex
        };
        p.sprints = store.state.session.project.sprints;
        p.stories = store.state.session.project.stories;
        return db.put(p);
      })
      .catch(err => console.error(err));
  },
  storeSprint: sprint => {
    const prj = store.state.session.project;
    console.log("Adding sprint to project");
    console.log(prj);
    const db = store.state.db;
    db.get(prj._id)
      .then(p => {
        let sprints = p.sprints;
        if (!sprints) {
          sprints = [];
        }
        sprints.push(sprint);
        p.sprints = sprints;
        return db.put(p);
      })
      .catch(err => console.error(err));
  },
  backlogState: project => {
    const stories = project.stories
      .filter(s => s !== undefined)
      .filter(s => s !== null)
      .map((story, i) => {
        story.index = i;
        if (story.tasks === undefined) {
          story.tasks = [];
        }
        return story;
      });
    const incomplete = stories.filter(story => incompleteFilter(story));
    const complete = stories.filter(story => completeFilter(story));
    return {
      incomplete,
      complete
    };
  }
};
