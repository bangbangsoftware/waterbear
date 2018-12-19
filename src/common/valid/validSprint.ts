const empty = (obj: any) => {
  if (!obj) {
    return true;
  }
  if (obj === undefined) {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

const unfinished = (sprint: any) => {
  if (empty(sprint)) {
    return "Nothing in the sprint";
  }

  if (!sprint.list) {
    return "No stories in the sprint";
  }

  if (!sprint.list.length) {
    return "No stories in the sprint";
  }

  const allTasks = sprint.list
    .filter((story: any) => story.tasks)
    .map((story: any) => story.tasks)
    .filter((tasks: Array<any>) => tasks.length > 0);
  //        .filter(task => Object.keys(task).length > 0 || task.constructor !== Object)

  console.log(allTasks);

  if (allTasks.length === 0) {
    return "No tasks in the stories";
  }

  return false;
};

const howManyDays = (dateString: string, now: Date) => {
  const date = new Date(dateString);
  var timeDiff = Math.abs(now.getTime() - date.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};

const noTaskStarted = (sprint: any) => {
  const stories = sprint.list.filter((story: any) => {
    const startedTasks = story.tasks.filter((task: any) => task.startDate);
    return startedTasks.length > 0;
  });
  return stories.length === 0;
};

const invalid = (sprint: any, now = new Date()) => {
  const fail = unfinished(sprint);
  if (fail) {
    console.log(fail);
    return {
      state: "The sprint is not defined yet",
      description: fail
    };
  }
  if (!sprint.startDate) {
    return {
      state: "The sprint has not started yet"
    };
  }

  const sinceStart = howManyDays(sprint.startDate, now);
  const nothingStarted = noTaskStarted(sprint);
  if (nothingStarted && sinceStart > 0) {
    return {
      state: "The sprint has a false start",
      description:
        "It started " + sinceStart + " days ago but no task have started yet"
    };
  }
  return false;
};

export default {
  invalid,
  howManyDays
};
// impact * cost * confidence / time = score
