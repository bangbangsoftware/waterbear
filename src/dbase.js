import store from './store.js'

const name = 'waterbear'
const remoteCoach = store.state.session.couchURL + name
const pouchOpts = {
   skipSetup: true,
   live: true
}
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const error = err => console.error(err)
const db = new PouchDB(remoteCoach, pouchOpts, error)
export default db
