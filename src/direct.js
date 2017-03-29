import router from './router/index.js'
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

const goProject = (me, project, resolve, reject) => {
   store.commit('project', project)
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
}

const service = (me) => {
   return new Promise((resolve, reject) => {
      try {
         console.log('HOW DO I direct the route????')
         console.log(router)
         console.log(me)
         if (!window) {
            resolve('no window')
            return
         }
         if (typeof me.currentProject === 'undefined') {
            resolve('start')
            return
         }
         db.get(me.currentProject).then(project => {
            goProject(me, project, resolve, reject)
         }).catch(err => {
            console.error('Cannot find "' + me.currentProject + '".')
            console.error(err)
            resolve('start/' + me.currentProject)
         })
      } catch (er) {
         console.log(er)
         reject(er)
      }
   })
}

export default service
