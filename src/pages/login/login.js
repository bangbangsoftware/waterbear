import Vue from 'vue'

import store from '../../store.js'
import user from '../../user.js'

import template from './login.html'
import './login.css'

const error = err => console.error(err)
const name = 'waterbear'
const pouchOpts = {
    skipSetup: true,
    live: true
}
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-authentication'))

const oops = (err, email, where) => {
    console.error(where)
    console.error(err)
    let error = err.error + ' ' + err.reason + ' (' + err.status + ')'
    if (err.status === 0 && err.name === 'unknown') {
        error = 'Cannot connect to database'
    }
    if (err.status === 404) {
        error = 'The login failed '
    }
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
        store.commit('loaded', false)
        const element = document.getElementById('email')
        element.focus()
    },
    methods: {
        login: function(email, pw) {
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

            const remoteCoach = this.session.couchURL + name
            const db = (typeof PouchDB.plugin === Function) ? new PouchDB(remoteCoach, pouchOpts, error) : PouchDB(remoteCoach, pouchOpts, error)
            store.commit('db', db)

            user.login(email, pw, db)
                .then(here => {
                    window.location.href = '#/' + here
                })
                .catch(err => oops(err, email, err))
        }
    }
}

Vue.component('login', comp)
export default comp
