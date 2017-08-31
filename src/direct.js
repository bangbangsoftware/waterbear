// import router from './router/index.js'
import store from './store.js'
import db from './dbase.js'
import userService from './user.js'

const whereNow = (project, user, resolve) => {
   if (typeof user.days === 'undefined' || user.days.length === 0) {
      resolve('member')
      return
   }
   if (typeof project.stories === 'undefined' || project.stories.length === 0) {
      resolve('story')
      return
   }
   resolve('story')
}

const register = (user, project, resolve, reject) => {
   console.log('Found...')
   console.log(project)
   console.log('For...')
   console.log(user)
   store.commit('project', project)
   store.commit('log', user.name + ' logged on')
   store.commit('log', 'entering project ' + project._id)

   const projectsUser = userService.loadUser(user, project)
   store.commit('user', projectsUser)
   whereNow(project, projectsUser, resolve)
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
      console.log(me)
      if (typeof me.currentProject === 'undefined') {
         loadUser(me, resolve, reject, database)
      } else {
         goProject(me, resolve, reject, database)
      }
   })
}

export default service
