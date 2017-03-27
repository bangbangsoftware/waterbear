import Vue from 'vue'

import store from '../../../store.js'

import template from './start.html'
import './start.css'

import db from '../../../dbase.js'

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
         this.error = err.error + ' ' + err.reason + ' (' + err.status + ')'
         if (err.status === 409) {
            this.error = email + ' is already in use'
         }
         const emailElement = document.getElementById('email')
         if (emailElement) {
            emailElement.focus()
         }
         store.commit('error', this.error)
         return this.error
      },
      createUser: (email, pw) => {
         if (email.length === 0) {
            const emailElement = document.getElementById('email')
            if (emailElement) {
               emailElement.focus()
            }
            return 'Missing email'
         }
         if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            const emailElement = document.getElementById('email')
            if (emailElement) {
               emailElement.focus()
            }
            return 'Email looks a bit wrong'
         }
         if (pw.length === 0) {
            const pwElement = document.getElementById('password')
            if (pwElement) {
               pwElement.focus()
            }
            return 'Missing password'
         }
         db.logout().then(() => {
               const metadata = {
                  email: '',
                  birthday: '',
                  skills: [],
                  asperations: [],
                  hours: [],
                  holidays: []
               }
               return db.signup(email, pw, {
                  metadata
               })
            }).catch(err => comp.methods.oops(err, email, 'logout'))
            .then(() => {
               return db.login(email, pw)
            }).catch(err => comp.methods.oops(err, email, 'signup'))
            .then(me => {
               console.log('Start login...')
               console.log(me)
               store.commit('user', me)
               store.commit('log', email + ' is a new owner')
               store.commit('db', db)
               store.commit('stage', {
                  email
               })
            }).catch(err => comp.methods.oops(err, email, 'login'))
      }
   }
}

Vue.component('start', comp)
export default comp
