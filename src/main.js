// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//

import App from './App'
import router from './router'
import Vue from 'vue'
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))
console.log('Hello from %cTardigrade', 'font-size:300%; color:orange')

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(VueMaterial)
/**
 @TOD Need to download them and fref locally
import "//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"
import "//fonts.googleapis.com/icon?family=Material+Icons"
**/

Vue.material.registerTheme({
  app: {
      primary: 'cyan'
    },
  about: {
      primary: 'indigo'
    },
  contact: {
      primary: 'teal'
    }
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
