import defaults from "./defaults";
import { Member, MemberService } from "./user/member";

const story = {
  title: "",
  descAs: "",
  descWant: "",
  descThat: "",
  tags: [],
  colourNo: 6,
  acs: [],
  valid: false
};

const session = {
  planState: "sprintSelect",
  loaded: false,
  story,
  task: {},
  menu: false,
  error: "",
  currentStory: -1,
  sprint: {
    name: "",
    from: "",
    to: ""
  },
  sprints: [],
  project: {
    _id: -1,
    stories: [],
    members: Array<Member>(),
    defaults: [],
    sprints: [],
    current: {
      sprintIndex: -1
    }
  },
  user: <Member>{},
  couchURL: "http://localhost:5984/"
};

const signup = {
  stages: []
};
const db: any = { put: () => {} };

export default {
  menu: false,
  feeds: [],
  db,
  members: [],
  signup,
  session,
  defaults
};
