import comp from "./data";

it("should have a bunch of functions", () => {
  const app = comp.methods;
  expect(typeof app.save).toBe("function");
});
