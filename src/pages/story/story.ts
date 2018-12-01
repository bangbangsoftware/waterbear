import store from "../../store";
// import Vue from 'vue'

import "./tags/tags.vue";
import "./list/list.vue";
import "./colours/colours.vue";
import "./acceptance/acceptance.vue";
import "./desc/desc.vue";

import beforeCreate from "../../loginCheck.js";

import valid from "./valid.js";

export default {
  name: "story",
  beforeCreate,
  data: function() {
    return {
      story: store.state.session.story,
      session: store.state.session
    };
  },
  methods: {
    $router:{go:(a:any)=>{}},
    clearStory: function() {
      store.commit("clearStory");
    },
          postStory: function(story:any) {
      var ok = valid(story);
      if (!ok) {
        console.log("invalid story...");
        console.log(story);
        return;
      }
      console.log("posting Story");
      store.commit("postStory");
      const prj = store.state.session.project;
      console.log("Adding stories to..");
      console.log(prj);
      const db = store.state.db;
      db.get(prj._id)
        .then((p:any) => {
          p.stories = prj.stories;
          return db.put(p);
        })
        .catch((err:any) => console.error(err));
    },
          whatsNeeded: function(story:any) {
      valid(story);
    },
    navigateTo: function(nav:any) {
      this.$router.go({
        path: nav
      });
    }
  }
};
