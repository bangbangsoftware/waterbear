import comp from "./skills";

describe("skills.spec", () => {
  it("should have data", done => {
    const data = comp.data;
    expect(typeof data).toBe("function");
    done();
  });
});
