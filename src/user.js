import gotoNext from './direct.js'
import db from './dbase.js'
import store from './store.js'

const service = {
   owner: owner => {
      return new Promise((resolve, reject) => {
         db.get(store.state.session.project._id)
            .then(prj => {
               prj.owner = owner
               prj.defaults = store.state.defaults
               return store.state.db.put(prj)
            }).then(proj => {
               console.log('Member owner to db -  ' + store.state.session.project._id)
               console.log('And added defaults')
               proj._id = store.state.session.project._id
               store.commit('project', proj)
            }).catch(err => reject(err))
      })
   },
   replaceMember: (memberList, replacement) => {
      const newList = memberList
         .filter(member => member.name !== replacement.name)
      newList.push(replacement)
      service.storeMembers(newList)
   },
   storeMembers: (members) => {
      return new Promise((resolve, reject) => {
         db.get(store.state.session.project._id)
            .then(prj => {
               prj.members = members
               return db.put(prj)
            }).then(proj => {
               console.log('Member added to db -  ' + store.state.session.project._id)
               proj._id = store.state.session.project._id
               store.commit('project', proj)
               resolve(proj)
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
   }
}

export default service
