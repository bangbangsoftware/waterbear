import Vue from 'vue'
import Router from 'vue-router'
import signup from '../components/signup/signup.vue'
import story from '../components/story/story.vue'
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
         name: 'signup',
         component: signup
      }, {
         path: '/story',
         name: 'story',
         component: story
      }

   ]
})
