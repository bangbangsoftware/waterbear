// import router from './router/index.js'
import store from './store.js'
import db from './dbase.js'

const whereNow = (user, resolve) => {
   store.commit('user', user)
   if (typeof user.hours === 'undefined' || user.hours.length === 0) {
      resolve('member')
   } else {
      resolve('story')
   }
}

const goProject = (me, resolve, reject, db) => {
   console.log('db....')
   console.log(db)
   db.get(me.currentProject).then(project => {
      console.log('Found ' + me.currentProject)
      store.commit('project', project)
      store.commit('log', me.email + ' logged on')
      store.commit('user', me)
      const owner = project.owner
      if (owner.email === me.name) {
         console.log('Owner has logged in')
         whereNow(owner, resolve)
      } else {
         console.log('A member has logged in?')
         const memberList = project.members.filter(member => member.email === me.email)
         if (memberList.length === 0) {
            reject('Not in project ' + project.name + '.')
         } else {
            whereNow(memberList[0], resolve)
         }
      }
   }).catch(err => {
      console.error('Cannot find "' + me.currentProject + '".')
      console.error(err)
      resolve('start/' + me.currentProject)
   })
}

const loadUser = (me, resolve, reject, db) => {
   db.getUser(me.name).then(user => {
      if (typeof user.currentProject === 'undefined') {
         resolve('start')
      } else {
         goProject(user, resolve, reject, db)
      }
   }).catch(error => {
      console.error(error)
      reject('Bad user')
   })
}

const service = (me, database = db) => {
   return new Promise((resolve, reject) => {
      console.log('HOW DO I direct the route????')
      // console.log(router)
      console.log(me)
      if (typeof me.currentProject === 'undefined') {
         loadUser(me, resolve, reject, database)
      } else {
         goProject(me, resolve, reject, database)
      }
   })
}

export default service
