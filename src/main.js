// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//

import App from './App'
import router from './router'
import Vue from 'vue'
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))
console.log('Hello from %cTardigrade', 'font-size:300%; color:orange')

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   template: '<App/>',
   components: {
      App
   }
})

