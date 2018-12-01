import store from "../../../store";
import Vue from "vue";
import "./colours.css";

const comp = {
  name: "colours",
  data: function() {
    return {
      colours: store.state.defaults.colours,
      colourClasses: store.state.defaults.colourClasses,
      selectedColour: store.state.session.story.colourNo
    };
  },
  methods: {
    changeColour: (no:number) => {
      console.log("Selecting colour " + no);
      store.commit("colour", no);
      return no;
    },
    navigateTo: function(nav:string) {
      const vue = <any> this;
      vue.$router.go({
        path: nav
      });
    }
  }
};

Vue.component("colours", comp);
export default comp;
