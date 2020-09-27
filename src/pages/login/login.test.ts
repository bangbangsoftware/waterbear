import comp from "./login";

describe("login.spec", () => {
  it("should have a bunch of functions  ", done => {
    const login = comp.methods;
    expect(typeof login.login).toBe("function");
    done();
  });
});
