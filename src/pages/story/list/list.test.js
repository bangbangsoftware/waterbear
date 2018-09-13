import comp from "./list.js";

describe("list.spec.js", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.navigateTo).toBe("function");
    done();
  });
});
