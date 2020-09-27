import diary from "./setup/diary";
// import util from "./util";

import defaults from "./setup/hours";
import { Member, Sprint, Story, Task } from "@/waterbear3";

const dataOne = () => {
  const startDate = new Date(2018, 7, 21, 9, 0, 0, 0);
  const weekLater = new Date(2018, 7, 28, 10, 0, 0, 0);
  const saturday = new Date(2018, 4, 26, 10, 0, 0, 0); // this is 26 of March ???
  const over = new Date(2018, 8, 10, 10, 0, 0, 0);
  // const now = new Date(2018, 7, 22, 10, 0, 0, 0);

  const days = defaults();
  const members = new Array<Member>();
  const mick = <Member>{};
  mick.name = "mick";
  mick.days = days;
  const fred = <Member>{};
  fred.name = "fred";
  fred.days = days;
  members.push(mick);
  members.push(fred);
  const both = diary.setup(members, startDate);
  const member = both.members[0];

  const taskOne = <Task>{
    id: 1,
    storyIndex: 1,
 
    name: "Go go go!",
    desc: "trust me",
    est: 2,
    skill: "bang",

    status: "todo",
    assignedTo: <Member> <unknown>{
      id: 3
    },

    blockers: [],
  
    valid: true,
    error: "",
  
    history: []
  };

  const taskTwo = <Task>{
    id: 2,
    storyIndex: 1,
 
    name: "Go on then",
    desc: "blar",
    est: 2,
    skill: "bang",

    status: "todo",
    assignedTo: <Member> <unknown>{
      id: 3
    },

    blockers: [],
  
    valid: true,
    error: "",
  
    history: []
  };



  const tasks = new Array<Task>();
  tasks.push(taskOne);
  tasks.push(taskTwo);

  const story = <Story> {
    id: 1,
    index: 1,
    title: "",
    descAs: "",
    descWant: "",
    descThat: "",
  
    tasks,
  
    tags: [],
    colourNo: 2,
    acs: [],
  
    points: 10,
  
    valid: false,
    error: "",
    selected: false
  };

  const list = new Array<Story>();
  list.push(story);

  const sprint = <Sprint> {
    startTime: "10:10",
    name: "a sprint",
    startDate,
    list,
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
