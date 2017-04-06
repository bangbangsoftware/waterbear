// import router from './router/index.js'
import store from './store.js'
import db from './dbase.js'
import userService from './user.js'

const whereNow = (user, resolve) => {
   store.commit('user', user)
   if (typeof user.hours === 'undefined' || user.hours.length === 0) {
      resolve('member')
   } else {
      resolve('story')
   }
}

const register = (user, project, resolve, reject) => {
   console.log('Found...')
   console.log(project)
   console.log('For...')
   console.log(user)
   store.commit('project', project)
   store.commit('log', user.email + ' logged on')
   store.commit('user', user)
   const owner = project.owner
   if (owner.name === user.name) {
      console.log('Owner has logged in')
      userService.owner(user)
      whereNow(owner, resolve)
   } else {
      console.log('A member has logged in?')
      const memberList = project.members.filter(member => member.name === user.name)
      if (memberList.length === 0) {
         reject('Not in project ' + project.name + '.')
      } else {
         userService.replaceMember(memberList, user)
         whereNow(memberList[0], resolve)
      }
   }
}

const unfoundProject = (me, err, resolve) => {
   console.error('Cannot find "' + me.currentProject + '".')
   console.error(err)
   resolve('start/' + me.currentProject)
}

const goProject = (me, resolve, reject, db) => {
   console.log('db....')
   console.log(db)
   db.get(me.currentProject)
      .then(p => register(me, p, resolve, reject))
      .catch(err => unfoundProject(me, err, resolve))
}

const goodUser = (user, resolve, reject, db) => {
   if (typeof user.currentProject === 'undefined') {
      store.commit('error', 'Need to define a project')
      resolve('start')
   } else {
      goProject(user, resolve, reject, db)
   }
}

const badUser = (error, reject) => {
   console.error(error)
   reject('Bad user')
}

const loadUser = (me, resolve, reject, db) => {
   db.getUser(me.name)
      .then(user => goodUser(user, resolve, reject, db))
      .catch(error => badUser(error, reject))
}

const service = (me, database = db) => {
   store.commit('db', db)
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
