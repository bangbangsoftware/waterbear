import Vue from 'vue'
import Router from 'vue-router'
import signup from '../pages/signup/signup.vue'
import story from '../pages/story/story.vue'
import login from '../pages/login/login.js'
import member from '../pages/member/member.js'
import plan from '../pages/plan/plan.js'
import sprint from '../pages/plan/sprint/sprint.js'
import '../common/feed/feed.js'

Vue.use(Router)

export default new Router({
   routes: [{
      path: '/',
      name: 'login',
      component: login
   }, {
      path: '/start',
      name: 'signup',
      component: signup
   }, {
      path: '/member',
      name: 'member',
      component: member
   }, {
      path: '/story',
      name: 'story',
      component: story
   }, {
      path: '/plan',
      name: 'plan',
      component: plan
   }, {
      path: '/sprint/:id',
      name: 'sprint',
      component: sprint
   }]
})
