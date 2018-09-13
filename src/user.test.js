import user from "./user.js";

describe("user.spec.js", () => {
  it("should have a bunch of functions  ", done => {
    expect(typeof user.owner).toBe("function");
    expect(typeof user.replaceMember).toBe("function");
    expect(typeof user.storeMembers).toBe("function");
    expect(typeof user.login).toBe("function");
    expect(typeof user.signup).toBe("function");
    expect(typeof user.currentProject).toBe("function");
    done();
  });
});
