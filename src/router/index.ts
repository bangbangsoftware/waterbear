import Vue from "vue";
import Router from "vue-router";
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

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/devopen",
      name: "devopen",
      component: devopen
    },
    {
      path: "/start",
      name: "signup",
      component: signup
    },
    {
      path: "/team",
      name: "team",
      component: team
    },
    {
      path: "/data",
      name: "rawdata",
      component: data
    },
    {
      path: "/member",
      name: "member",
      component: member
    },
    {
      path: "/story",
      name: "story",
      component: story
    },
    {
      path: "/refine",
      name: "refine",
      component: refine
    },
    {
      path: "/plan",
      name: "plan",
      component: plan
    },
    {
      path: "/sprint/:id",
      name: "sprint",
      component: sprint
    }
  ]
});
