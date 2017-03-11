import Vue from 'vue'

import store from '../../store.js'
import db from '../../dbase.js'

import template from './login.html'
import './login.css'

import router from '../../router/index.js'

const comp = {
   name: 'login',
   template,
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
      },
      login: (email, pw) => {
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
               console.log('About to login')
               return db.login(email, pw)
            }).catch(err => {
               comp.methods.oops(err, email, 'login')
               return
            })
            .then(me => {
               if (me) {
                  console.log('There you are...')
                  console.log(me)
                  store.commit('user', me)
                  store.commit('log', email + ' is a new owner')
                  store.commit('db', db)
                  try {
                     console.log('HOW DO I direct the route????')
                     console.log(router)
                     window.location.href = '#/story'
                  } catch (er) {
                     console.log(er)
                  }
               }
            }).catch(err => comp.methods.oops(err, email, 'logout'))
      }
   }
}

Vue.component('login', comp)
export default comp
