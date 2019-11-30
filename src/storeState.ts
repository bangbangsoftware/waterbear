import defaults from "./defaults";
import {
  Story,
  Task,
  Member,
  Session,
  Project,
  Database,
  Time
} from "@/waterbear3";

const story: Story = {
  id: -1,
  index: -1,
  title: "",
  descAs: "",
  descWant: "",
  descThat: "",

  tasks: Array<Task>(),

  tags: new Array<String>(),
  colourNo: 8,
  acs: new Array<String>(),

  points: -1,

  valid: false,
  error: "",
  selected: false
};

const session: Session = {
  planState: "sprintSelect",
  loaded: false,
  story,
  task: false,
  error: "",
  sprint: {
    startDate: new Date(),
    startTime: "",
    list: [],
    name: ""
  },
  project: <Project>{
    _id: "-1",
    name: "",
    stories: [],
    members: Array<Member>(),
    defaults,
    sprints: [],
    current: {
      sprintIndex: -1
    }
  },
  user: <Member>{},
  couchURL: "http://localhost:5984/",
  planChartData: false,
  skills: false,
  userCtx: "",
  change: <Time>{},
  incomplete: 0
};

const signup = {
  stages: []
};
const db: Database = { get: () => {}, put: () => {} };

export default {
  menu: false,
  feeds: [],
  db,
  members: [],
  signup,
  session,
  defaults
};
