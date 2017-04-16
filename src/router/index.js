import Vue from 'vue'
import Router from 'vue-router'
import signup from '../components/signup/signup.vue'
import story from '../components/story/story.vue'
import login from '../components/login/login.js'
import member from '../components/member/member.js'
import plan from '../components/plan/plan.js'
import '../components/feed/feed.js'

/**
 @TOD Need to download them and fref locally
import "//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"
import "//fonts.googleapis.com/icon?family=Material+Icons"
**/

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(Router)
Vue.use(VueMaterial)

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
      }
   ]
})
