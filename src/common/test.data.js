import diary from "./setup/diary.js";
// import util from "./util.js";

import defaults from "./setup/hours.js";

const dataOne = () => {
  const startDate = new Date(2018, 7, 21, 9, 0, 0, 0);
  const weekLater = new Date(2018, 7, 28, 10, 0, 0, 0);
  const saturday = new Date(2018, 4, 26, 10, 0, 0, 0); // this is 26 of March ???
  const over = new Date(2018, 8, 10, 10, 0, 0, 0);
  // const now = new Date(2018, 7, 22, 10, 0, 0, 0);

  const days = defaults();
  const members = [
    {
      id: 3,
      name: "mick",
      days
    },
    {
      id: 4,
      name: "fred",
      days
    }
  ];
  const both = diary.setup(members, startDate);
  const member = both.members[0];

  const taskOne = {
    name: "Go go go!",
    status: "todo",
    skill: "bang",
    est: 2,
    assignedTo: {
      id: 3
    }
  };
  const taskTwo = {
    name: "Go on then",
    status: "todo",
    est: 8,
    skill: "bang",
    assignedTo: {
      id: 0
    }
  };
  const story = {
    tasks: [taskOne, taskTwo]
  };
  const sprint = {
    startDate,
    list: [story],
    days: 10
  };

  return {
    startDate,
    weekLater,
    over,
    sprint,
    member,
    saturday,
    members: both.members
  };
};

export default dataOne;
