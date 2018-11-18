import director from "./director";

describe("director.spec.js", () => {
  it("should direct users of different roles to different places ", done => {
    const dev = {
      role: "Frontend Dev"
    };
    const prj = {
      sprints: []
    };
    expect(director(dev, prj)).toBe("work");
    done();
  });

  it("should direct users of different roles to different places ", done => {
    const dev = {
      role: "Scrum Master"
    };
    const prj = {
      sprints: []
    };
    expect(director(dev, prj)).toBe("sprint/0");
    done();
  });
});
