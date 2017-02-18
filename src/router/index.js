import Vue from 'vue'
import Router from 'vue-router'
import signup from '../components/signup/signup.vue'
import '../components/feed/feed.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signup',
      component: signup
    }
  ]
})
