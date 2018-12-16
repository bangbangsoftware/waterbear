import store from "../../../../../store";

export default {
  name: "actions",
  props: ["story", "c"],
  methods: {
    editStory: function(story:any, c:number) {
      console.log("edit");
      story.index = c;
      store.commit("currentStory", story);
    },
    removeStory: function(story:any, c:number) {
      console.log("remove");
      store.commit("deleteStory", c);
    },
    breakStory: function() {
      console.log("break");
    }
  }
};
