import comp from "./name";

describe("name.spec", () => {
  it("should have a bunch of functions", done => {
    const app = comp.methods;
    expect(typeof app.newNick).toBe("function");
    done();
  });
});
