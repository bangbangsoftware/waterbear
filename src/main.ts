// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//

import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import Vuex from "vuex";
import "@mdi/font/css/materialdesignicons.css";

console.log("Hello from %cTardigrade", "font-size:300%; color:orange");

import "font-awesome/css/font-awesome.css";
import "../node_modules/vuetify/dist/vuetify.min.css";

import Vuetify from "vuetify";

Vue.use(Vuetify);
/*
export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

*/

import store from "./store";
console.log("main", store);
console.log("main", store.state);

Vue.filter("truncate", function(value: string) {
  if (!value) {
    return "";
  }
  if (typeof value !== "string") {
    return value;
  }
  if (value.length < 20) {
    return value;
  }
  return value.substring(0, 19) + "...";
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});
