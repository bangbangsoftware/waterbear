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
         pw: ''
      }
   },
   create: () => {
      const element = document.getElementById('email')
      element.focus()
   },
   methods: {
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
                  /**          const meta = {
                              metadata: {
                          skills: fred.skills,
                          currentProjectID: projectName
                   }
                            };
                            return this.projectDB.putUser(user.name, meta);
                   **/
            }).catch(err => {
               console.log(err)
            })
         }).catch(err => {
            console.log(err)
         })
         store.commit('log', email + ' is a new owner')
         store.commit('db', db)
         store.commit('stage', {
            email
         })
         return ''
      }
   }
}

Vue.component('start', comp)
