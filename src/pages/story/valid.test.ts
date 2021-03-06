import valid from "./valid";

it("valid.spec", () => {
  expect(typeof valid).toBe("function");
});

it("Expect a story with zero length title to be invalid", () => {
  const story = {
    title: ""
  };
  expect(valid(story)).toBe(false);
});

it('Expect a story with zero length description "as" to be invalid', () => {
  const story = {
    title: "Hello",
    descAs: "",
    descWant: "",
    descThat: "",
    acs: []
  };
  expect(valid(story)).toBe(false);
});

it('Expect a story with zero length description "want" to be invalid', () => {
  const story = {
    title: "Hello",
    descAs: "As a test",
    descWant: "",
    descThat: "",
    acs: []
  };
  expect(valid(story)).toBe(false);
});

it('Expect a story with zero length description "that" to be invalid', () => {
  const story = {
    title: "Hello",
    descAs: "As a test",
    descWant: "to be able to validate a story",
    descThat: "",
    acs: []
  };
  expect(valid(story)).toBe(false);
});

it("Expect a story with zero length acs list to be invalid", () => {
  const story = {
    title: "Hello",
    descAs: "As a test",
    descWant: "to be able to validate a story",
    descThat: "the story is complete and understandable",
    acs: []
  };
  expect(valid(story)).toBe(false);
});

it("Expect a full story to be valid", () => {
  const story = {
    title: "Hello",
    descAs: "As a test",
    descWant: "to be able to validate a story",
    descThat: "the story is complete and understandable",
    acs: ["Must have all the fields filled in"]
  };
  expect(valid(story)).toBe(true);
});
