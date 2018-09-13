import store from "../../store.js";
import Vue from "vue";

const zeroFill = val => {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
};

const feedComp = {
  name: "feed",
  data: () => {
    return {
      feeds: store.state.feeds
    };
  },
  filters: {
    time: date => {
      return (
        zeroFill(date.getHours()) +
        ":" +
        zeroFill(date.getMinutes()) +
        ":" +
        zeroFill(date.getSeconds())
      );
    }
  }
};

Vue.component("feed", feedComp);
export default feedComp;
