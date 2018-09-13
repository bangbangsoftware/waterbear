import comp from "./tags.js";

describe("tags.spec.js", () => {
  it("should have a functions", done => {
    expect(typeof comp.methods.navigateTo).toBe("function");
    done();
  });
});
