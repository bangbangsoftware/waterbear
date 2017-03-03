import store from '../../store.js'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

import Router from 'vue-router'

import './start/start'
import './project/project'
import './summary/summary'
import './owner/owner'
import './team/team'

Vue.use(VueMaterial)

export default {
   name: 'signup',
   data: function() {
      return {
         stages: store.state.signup.stages,
         signup: {
            error: '',
            stage: 'start'
         },

         navigateTo: function(nav) {
            // Do what you want here.
            // this.saveTheThing()
            console.log(Router)

            Vue.$router.go({
               path: nav
            })
         }
      }
   }
}
