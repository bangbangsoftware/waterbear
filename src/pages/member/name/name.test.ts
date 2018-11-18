import comp from "./name.js";

describe("name.spec.js", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.newNick).toBe("function");
    done();
  });
});
