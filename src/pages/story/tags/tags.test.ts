import comp from "./tags";

describe("tags.spec", () => {
  it("should have a functions", done => {
    expect(typeof comp.methods.navigateTo).toBe("function");
    done();
  });
});
