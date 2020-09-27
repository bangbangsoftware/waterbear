import comp from "./list";

describe("list.spec", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.navigateTo).toBe("function");
    done();
  });
});
