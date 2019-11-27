import store from "../../../../../store";
import { Story } from "@/waterbear3";

export default {
  name: "actions",
  props: ["story", "c"],
  methods: {
    editStory: function(story: Story, c: number) {
      console.log("edit");
      story.index = c;
      store.commit("currentStory", story);
    },
    removeStory: function(story: Story, c: number) {
      console.log("remove");
      store.commit("deleteStory", c);
    },
    breakStory: function() {
      console.log("break");
    }
  }
};
