import teamStore from "./teamStore";
import {testData} from '../../user/member';

it("is possbile to book day off sick", () => {
  const state = {
    members: []
  };
  const user = testData;
  const date = new Date(2017, 11, 12, 8, 2);
  const sickness = {user,date};
  teamStore.sick(state, user);
});
