import store from "../../store";
import Vue from "vue";


const feedComp = {
  name: "feed",
  data: () => {
    return {
      feeds: store.state.feeds
    };
  },
  filters: {
    time: (date: Date) => {
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

const zeroFill = (val: number) => {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
};

Vue.component("feed", feedComp);
export default feedComp;
