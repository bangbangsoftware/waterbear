const name = 'waterbear'
const remoteCoach = 'http://localhost:5984/' + name
const pouchOpts = {
   skipSetup: true,
   live: true
}
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const error = err => console.error(err)
const db = new PouchDB(remoteCoach, pouchOpts, error)
export default db
