import comp from "./team.js";

it("should have a bunch of functions  ", () => {
  // expect(comp).toBe('function') this is the markup ???
  expect(typeof comp.methods.addrole).toBe("function");
});
