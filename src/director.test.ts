import director from "./director";
import {Member} from './user/member';

describe("director.spec.js", () => {
  it("should direct users of different roles to different places ", done => {
    const dev = <Member> {
      role: "Frontend Dev"
    };
    const prj = {
      sprints: []
    };
    expect(director(dev, prj)).toBe("work");
    done();
  });

  it("should direct users of different roles to different places ", done => {
    const dev = <Member> {
      role: "Scrum Master"
    };
    const prj = {
      sprints: []
    };
    expect(director(dev, prj)).toBe("sprint/0");
    done();
  });
});
