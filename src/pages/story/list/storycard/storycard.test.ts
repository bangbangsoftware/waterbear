import StoryCard from "./storycard";

describe("acceptance.spec", () => {
  it("should have a bunch of functions  ", done => {
    expect(typeof StoryCard.data).toBe("function");
    StoryCard.data();
    done();
  });
});
