import { Member } from "@/waterbear3";

export default {
  // @TODO so this just adds the member to the
  //       members list??? Should it not change
  // the member's diary to declare sickness?
  sick: (state: any, member: Member) => {
    state.members.push(member);
  }
};
