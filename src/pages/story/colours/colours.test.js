import comp from "./colours.js";

describe("colour.spec.js", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.navigateTo).toBe("function");
    expect(typeof app.changeColour).toBe("function");
    done();
  });
});
