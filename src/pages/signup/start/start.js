import Vue from 'vue'
import Password from 'vue-password-strength-meter'

import store from '../../../store.js'
import db from '../../../dbase.js'
import user from '../../../user.js'

import template from './start.html'
import './start.css'

const oops = (err, email, where) => {
   if (typeof err === 'undefined') {
      return ''
   }
   console.error(where)
   console.error(err)
   let error = err.error + ' ' + err.reason + ' (' + err.status + ')'
   if (err.status === 409) {
      error = email + ' is already in use'
   }
   const emailElement = document.getElementById('email')
   if (emailElement) {
      emailElement.focus()
   }
   store.commit('error', error)
   return error
}

const register = email => {
   const me = {
      name: email
   }
   console.log('Start login...')
   console.log(me)
   store.commit('log', email + ' is a new owner')
   store.commit('db', db)
   store.commit('user', me)
   store.commit('stage', me)
}

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
         db.logout().then(user.signup(email, pw))
            .catch(err => oops(err, email, 'logout'))
            .then(db.login(email, pw))
            .catch(err => oops(err, email, 'signup'))
            .then(register(email))
            .catch(err => oops(err, email, 'login'))
      }
   }
}

Vue.component('start', comp)
export default comp
