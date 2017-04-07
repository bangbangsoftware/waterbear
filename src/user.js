import gotoNext from './direct.js'
import db from './dbase.js'
import store from './store.js'

const metadata = {
   nick: '',
   role: '',
   birthday: '',
   skills: [],
   asperations: [],
   hours: [],
   holidays: []
}

const updateOwnerAndDefaults = (prj, owner) => {
   prj.owner = cleanUser(owner)
   prj.defaults = store.state.defaults
   return db.put(prj)
}

const updateMembers = (prj, members) => {
   prj.members = members
   return db.put(prj)
}

const setProject = (user, projectName) => {
   const metadata = cleanUser(user)
   metadata.currentProject = projectName
   const extra = {
      metadata
   }
   return db.putUser(user.name, extra)
}

const cleanUser = user => {
   const clean = metadata
   for (let key in metadata) {
      clean[key] = user[key]
   }
   clean.name = user.name
   return clean
}

const service = {
   owner: owner => {
      return new Promise((resolve, reject) => {
         let prj = store.state.session.project
         db.get(prj.id)
            .then(p => {
               prj = p
               updateOwnerAndDefaults(prj, owner)
            })
            .catch(err => reject(err))
            .then(() => {
               console.log('Owner owner to db -  ' + prj.id)
               console.log('And added defaults')
               store.commit('project', prj)
               resolve(prj)
            })
            .catch(err => reject(err))
      })
   },
   replaceMember: (memberList, replacement) => {
      const newList = memberList
         .filter(member => member.name !== replacement.name)
      newList.push(cleanUser(replacement))
      service.storeMembers(newList)
   },
   storeMembers: (members) => {
      return new Promise((resolve, reject) => {
         let prj = store.state.session.project
         db.get(prj._id)
            .then(p => {
               prj = p
               updateMembers(prj, members)
            })
            .catch(err => reject(err))
            .then(() => {
               console.log('Members owner to db -  ' + prj._id)
               store.commit('project', prj)
               resolve(prj)
            }).catch(err => reject(err))
      })
   },
   login: (email, pw) => {
      return new Promise((resolve, reject) => {
         console.log('About to logout then in')
         db.logout()
            .then(db.login(email, pw))
            .catch(err => reject(err))
            .then(me => gotoNext({
               name: email
            }))
            .catch(err => reject(err))
            .then(here => resolve(here))
            .catch(err => reject(err))
      })
   },
   signup: (email, pw) => {
      return db.signup(email, pw, {
         metadata
      })
   },
   currentProject: (user, projectName) => {
      return new Promise((resolve, reject) => {
         console.log('Setting current project for ' + user.name + ' to ' + projectName)
         db.getUser(user.name)
            .then(usr => setProject(usr, projectName))
            .catch(err => reject(err))
            .then(u => resolve(u))
            .catch(err => reject(err))
      })
   }
}

export default service
