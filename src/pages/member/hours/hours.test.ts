import comp from "./hours";

describe("hours.spec", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.toggleDay).toBe("function");
    expect(typeof app.toggleNight).toBe("function");
    done();
  });
});
