import store from "../../../store";
import Vue from "vue";
import "./name.css";

const comp = {
  name: "name",
  data: function() {
    return {
      session: store.state.session
    };
  },
  methods: {
    newNick: (name: string) => {
      console.log("New nick");
      store.commit("nick", name);
    }
  },
  beforeCreate: function() {
    const element = document.getElementById("name");
    if (element) {
      element.focus();
    }
  }
};

Vue.component("name", comp);
export default comp;
