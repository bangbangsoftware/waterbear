// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import Vue from 'vue'
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))
console.log('Hello from %cSession', 'font-size:300%; color:orange')

var projectDB
var project = null
console.log(project)

const noLogin = () => {
  if (projectDB) {
    return false
  }
  return true
}

const loggedIn = () => {
  return !noLogin()
}

const isIn = () => {
  console.log('Logged in?')
  if (noLogin()) {
    console.log('Session has no db, logging out')
     //    this.lastLocation = this.location.path()
     //    this.router.navigate(['login'])
    return false
  }
  return true
}

const onward = () => {
  // this.direction.next(this)
}

const logout = () => {
  projectDB = null
  project = null
  isIn()
}

const login = (name, pw) => {
  loginToDB(name, pw)
    .then(() => {
      this.message = ''
    }).catch(() => {
      this.message = 'Incorrect Login'
    })
}

const setupPouch = (name, user, pw) => {
  const remoteCoach = 'http://localhost:5984/' + name
  const pouchOpts = {
    skipSetup: true,
    live: true
  }
  const db = new PouchDB(remoteCoach, pouchOpts, this.error)
  return new Promise((resolve, reject) => {
    db.login(user, pw).then(me => {
      console.log('There you are...')
      console.log(me)
      resolve(db)
    }).catch(err => {
      reject(err)
      console.log(err)
    })
  })
}

const loginToDB = (name, pw) => {
  return new Promise((resolve, reject) => {
    setupPouch('waterbear', name, pw)
        .then(db => {
          setupDefaults(db)
          setupDB(db, name)
          resolve(true)
        }).catch(err => {
          console.error(err)
          reject(false)
        })
  })
}

const setupDefaults = (db) => {
  db.get('defaults')
    .then(defaults => {
      console.log('got defaults')
      this.defaults = defaults
    }).catch(err => {
      if (err.status === 404) {
        projectDB.put(this.getDefaults())
             .then(d => {
               this.defaults = d
               console.log('New defaults inserted')
             }).catch(this.error)
      }
    })
}

const setupDB = (db, name) => {
  projectDB = db

  projectDB.getUser(name)
      .then(user => {
        console.log('Got user')
        this.user = user
        return this.projectDB.get(user.currentProjectID)
      }).catch(this.error)

      .then(proj => {
        console.log('got user\'s current project')
        project = proj
        this.onward()
      }).catch(err => {
        if (err.status === 404) {
          this.direction.newProject()
        } else {
          this.error(err)
        }
      })
}

const mixin = {
  methods: {
    loggedIn,
    noLogin,
    isIn,
    onward,
    logout,
    login,
    loginToDB,
    setupDefaults
  }
}

/* eslint-disable no-new */
new Vue({
  mixins: [mixin],
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
