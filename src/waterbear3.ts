export const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const MOY = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const NORMAL = 0;
export const OFF = 2;

export const DS = [
  {
    state: 0,
    display: "",
    off: false
  },
  {
    state: 1,
    display: "WFH",
    off: false
  },
  {
    state: 2,
    display: "OFF",
    colour: "grey",
    off: true
  },
  {
    state: 3,
    display: "SICK",
    colour: "grey",
    off: true
  }
];

export interface Database {
  put: Function;
  get: Function;
}

export interface State {
  session: Session;
  feeds: Array<Feed>;
  defaults: Defaults;
  error: string;
  teamName: string;
  teamRole: string;
  teamEmail: string;
  members: Array<Member>;
  incomplete: number;
  complete: number;
  db: Database;
  signup: { stages: Array<string> };
}

export interface Defaults {
  colourClasses: string[];
  colours: string[];
  consequences: string[];
  tags: string[];
  roles: string[];
  skills: string[];
}

export interface Project {
  _id: string;
  name: string;
  defaults: Defaults;
  members: Array<Member>;
  stories: Array<Story>;
  sprints: Array<Sprint>;
  current: {
    sprintIndex: number;
  };
}

export interface PlanChartData {}

export interface Skills {}
export interface Sprint {
  startDate: Date;
  startTime: string;
  name: string;
}
export interface Feed {}

export interface Session {
  project: Project;
  sprint: Sprint;
  planChartData: PlanChartData;
  story: Story;
  skills: Skills;
  couchURL: string;
  user: Member;
  error: string;
  userCtx: string;
  planState: string;
  task: Task | false;
  change: boolean;
  loaded: boolean;
  incomplete: boolean;
}

export interface Balance {
  need: number;
  got: number;
  diff: number;
}

export interface SkillHour {
  hours: number;
  skills: Array<string>;
}

export interface TeamSkill {
  hours: number;
  skills: Array<string>;
  weight: number;
}

export interface DisplayDay {
  format: string;
  date: Date;
  newMonth: boolean | string;
  colour: string;
}

export interface MemberTime {
  details: Member;
  left: number;
  skills: Array<string>;
}
export interface MemberRemain {
  memberTimes: Array<MemberTime>;
  remainder: number;
}
export interface Track {
  name: string;
  onTrack: boolean;
  hoursOver: number;
}

export interface Hour {
  name: string;
  on: boolean;
}

export interface Day {
  name: string;
  day: Array<Hour>;
  night: Array<Hour>;
}

export interface Diary {
  off?: boolean;
}

export interface Member {
  nick: string;
  name: string;
  role: string;
  skills: Array<string>;
  days: Array<Day>;
  owner: boolean;
  birthday: Date | null;
  currentProject: string | null; // Not a great idea using a string as unique reference....
  asperations: Array<string>;
  holidays: Array<Date>;
  diary: Array<Diary>;
  hours?: number;
  weight?: number;
  picked?: boolean;
}

export interface Abandonded {
  hoursWasted: number;
  reason: string;
}

export interface History {
  date: Date;
  action: string;
  user: Member;
}

export interface Task {
  id: number;
  storyIndex: number;

  name: string;
  desc: string;
  est: number;
  skill: string;

  assignedTo: Member;

  start: Date;
  end: Date;
  paused: Date;

  blockers: Array<string>;

  abandoned: Abandonded;
  valid: boolean;
  error: string;

  history: Array<History>;
}

export interface Story {
  id: number;
  index: number;
  title: string;
  descAs: string;
  descWant: string;
  descThat: string;

  tasks: Array<Task>;

  tags: Array<String>;
  colourNo: number;
  acs: Array<String>;

  points: number;

  valid: boolean;
  error: string;
  selected: string;
}
