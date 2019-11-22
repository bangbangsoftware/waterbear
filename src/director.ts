import { Member } from "@/waterbear3";

const dev = (user: Member, project: any) => {
  const now = new Date();
  const started = project.sprints.filter(() => now);
  if (started.length === 0) {
    // Not in a sprint?!.... need to request scrum master and to do a sprint planning meeting
    return "work";
  }
  // Does the dev work on going?
  //    Is the times correct?
  //    Any blockers / distractions
  // Pick a new task from the sprint
  //
  return "devopen";
};

const service = (user: Member, project: any) => {
  if (typeof user.days === "undefined" || user.days.length === 0) {
    return "member";
  }

  if (typeof project.stories === "undefined" || project.stories.length === 0) {
    return "devopen"; // "story"
  }

  if (user.role === "Frontend Dev") {
    return dev(user, project);
  }

  if (user.role === "Scrum Master") {
    return "sprint/0";
  }

  return "devopen";
};
export default service;
