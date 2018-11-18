import comp from "./hours.js";

describe("hours.spec.js", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.toggleDay).toBe("function");
    expect(typeof app.toggleNight).toBe("function");
    done();
  });
});
