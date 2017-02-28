import Vue from 'vue'

import store from '../../../store.js'

import template from './start.html'
import './start.css'

const name = 'waterbear'
const error = err => console.error(err)
const remoteCoach = 'http://localhost:5984/' + name
const pouchOpts = {
   skipSetup: true,
   live: true
}
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const db = new PouchDB(remoteCoach, pouchOpts, error)

import Password from 'vue-password-strength-meter'

const comp = {
   name: 'start',
   template,
   components: {
      Password
   },
   data() {
      return {
         error: '',
         email: '',
         pw: '',
         session: store.state.session
      }
   },
   create: () => {
      const element = document.getElementById('email')
      element.focus()
   },
   methods: {
      oops: (err, email, where) => {
         console.error(where)
         console.error(err)
         if (err.status === 409) {
            const emailElement = document.getElementById('email')
            emailElement.focus()
            this.error = email + ' is already in use'
         } else {
            const emailElement = document.getElementById('email')
            emailElement.focus()
            this.error = err.error + ' ' + err.reason + ' (' + err.status + ')'
         }
         store.commit('error', this.error)
         return this.error
      },
      createUser: (email, pw) => {
         if (email.length === 0) {
            const emailElement = document.getElementById('email')
            emailElement.focus()
            return 'Missing email'
         }
         if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            const emailElement = document.getElementById('email')
            emailElement.focus()
            return 'Email looks a bit wrong'
         }
         if (pw.length === 0) {
            const pwElement = document.getElementById('password')
            pwElement.focus()
            return 'Missing password'
         }
         db.logout().then(() =>
            db.signup(email, pw, {
               metadata: {
                  email: '',
                  birthday: '',
                  currentProjectID: -1,
                  skills: [],
                  asperations: []
               }
            }).then(() => {
               db.login(email, pw).then(me => {
                  console.log('There you are...')
                  console.log(me)
                  store.commit('user', me)
                  store.commit('log', email + ' is a new owner')
                  store.commit('db', db)
                  store.commit('stage', {
                     email
                  })
                  return ''
               }).catch(err => comp.methods.oops(err, email, 'login'))
            }).catch(err => comp.methods.oops(err, email, 'signup'))
         ).catch(err => comp.methods.oops(err, email, 'logout'))
      }
   }
}

Vue.component('start', comp)
