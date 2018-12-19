import Vue from "vue";
import Router from "vue-router";
import { RouteConfig, RouterOptions } from "vue-router";
import signup from "../pages/signup/signup.vue";
import story from "../pages/story/story.vue";
import login from "../pages/login/login.vue";
import member from "../pages/member/member.vue";
import data from "../pages/data/data.vue";
import plan from "../pages/plan/plan.vue";
import sprint from "../pages/plan/sprint/sprint.vue";
import refine from "../pages/refine/refine.vue";
import team from "../pages/team/team.vue";
import devopen from "../pages/opener/dev/dev.vue";
import "../common/feed/feed.vue";

Vue.use(Router);

const redirectRoute = <RouteConfig>{ path: "*", redirect: "/" };
const loginRoute = <RouteConfig>{ path: "/", name: "/login", component: login };
const devopenRoute = <RouteConfig>{
  path: "/devopen",
  name: "devopen",
  component: devopen
};

const routes = Array<RouteConfig>();
routes.push(redirectRoute);
routes.push(loginRoute);
routes.push(devopenRoute);
routes.push({
  path: "/start",
  name: "signup",
  component: signup
});
routes.push({
  path: "/team",
  name: "team",
  component: team
});
routes.push({
  path: "/data",
  name: "rawdata",
  component: data
});
routes.push({
  path: "/member",
  name: "member",
  component: member
});
//routes.push({
// path: "/story",
// name: "story",
// component: story
//});
routes.push({
  path: "/refine",
  name: "refine",
  component: refine
});
routes.push({
  path: "/plan",
  name: "plan",
  component: plan
});
routes.push({
  path: "/sprint/:id",
  name: "sprint",
  component: sprint
});

const options = <RouterOptions>{ routes };

export default new Router(options);
