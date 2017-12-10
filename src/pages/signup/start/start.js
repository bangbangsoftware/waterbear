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
   let error = (err.error === undefined) ? err : err.error + ' ' + err.reason + ' (' + err.status + ')'
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
   if (store.state.session.error) {
      console.error('Can\'t register due to :' + store.state.session.error)
      return
   }
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

const signInReg = (email, pw) => {
   user.signup(email, pw)
       .catch(err => oops(err, email, 'signup'))
       .then(() => db.login(email, pw))
       .catch(err => oops(err, email, 'login'))
       .then(() => register(email))
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
         store.commit('error', '')
         if (email.length === 0) {
            const emailElement = document.getElementById('email')
            if (emailElement) {
               emailElement.focus()
            }
            return oops('Missing email', '', 'no email')
         }
         if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            const emailElement = document.getElementById('email')
            if (emailElement) {
               emailElement.focus()
            }
            return oops('Email looks a bit wrong', '', 'bad email')
         }
         if (pw.length === 0) {
            const pwElement = document.getElementById('password')
            if (pwElement) {
               pwElement.focus()
            }
            return oops('Missing password', '', 'no password')
         }
         db.logout()
            .then(() => signInReg(email, pw))
            .catch(err => {
                console.error(err)
                signInReg(email, pw)
            })
      }
   }
}

Vue.component('start', comp)
export default comp
