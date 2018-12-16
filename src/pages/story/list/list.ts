import store from "../../../store";
import Vue from "vue";
import "../colours/colours.css";
import "./list.css";
import StoryCard from "./storycard/storycard.vue";

const comp = {
  name: "list",
  data: function() {
    return {
      session: store.state.session,
      colourClasses: store.state.defaults.colourClasses
    };
  },
  components: {
    storyCard: StoryCard
  },
  methods: {
    navigateTo: function(nav: string) {
      const vue = <any> this;
      vue.$router.go({
        path: nav
      });
    }
  }
};
Vue.component("list", comp);
export default comp;
