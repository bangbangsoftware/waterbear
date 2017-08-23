// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//

import App from './App'
import router from './router'
import Vue from 'vue'

console.log('Hello from %cTardigrade', 'font-size:300%; color:orange')

import 'font-awesome/css/font-awesome.css'
import '../node_modules/vuetify/dist/vuetify.min.css'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.filter('truncate', function(value) {
   if (!value) {
      return ''
   }
   if (typeof value !== 'string') {
      return value
   }
   if (value.length < 20) {
      return value
   }
   return value.substring(0, 19) + '...'
})

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   template: '<App/>',
   components: {
      App
   }
})
