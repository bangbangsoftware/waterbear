// import store from '../../../store.js'
import Vue from "vue";

const comp = {
  name: "tags",
  data: function() {
    return {
      tags: [],
      taglist: [] // store.state.defaults
    };
  },
  methods: {
    navigateTo: function(nav) {
      this.$router.go({
        path: nav
      });
    }
  }
};

Vue.component("tags", comp);
export default comp;
