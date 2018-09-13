import store from "../../../../../store.js";

export default {
  name: "actions",
  props: ["story", "c"],
  methods: {
    editStory: function(story, c) {
      console.log("edit");
      story.index = c;
      store.commit("currentStory", story);
    },
    removeStory: function(story, c) {
      console.log("remove");
      store.commit("deleteStory", c);
    },
    breakStory: function() {
      console.log("break");
    }
  }
};
