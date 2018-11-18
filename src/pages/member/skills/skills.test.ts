import comp from "./skills.js";

describe("skills.spec.js", () => {
  it("should have data", done => {
    const data = comp.data;
    expect(typeof data).toBe("function");
    done();
  });
});
