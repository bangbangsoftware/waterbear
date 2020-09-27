import summary from "./summary";
import store from "../../../store";

it("should have empy fields to start with ", () => {
  const data = summary.data();
  const stages = store.state.signup.stages;
  const members = store.state.members;
  console.log(members);
  expect(data.members.length).toBe(members.length);
  expect(data.stages.length).toBe(stages.length);
});
