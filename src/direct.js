import router from './router/index.js'
import store from './store.js'
import db from './dbase.js'

const service = (me) => {
   const whereNow = (user, resolve) => {
      if (typeof user.hours === 'undefined' || user.hours.length === 0) {
         window.location.href = '#/member'
         resolve('member')
      } else {
         window.location.href = '#/story'
         resolve('story')
      }
   }
   return new Promise((resolve, reject) => {
      try {
         console.log('HOW DO I direct the route????')
         console.log(router)
         console.log(me)
         if (!window) {
            return 'no window'
         }
         if (typeof me.currentProject === 'undefined') {
            window.location.href = '#/start'
            resolve('start')
         }
         db.get(me.currentProject).then(project => {
            store.commit('project', project)
            const owner = project.owner
            if (owner.email === me.email) {
               console.log('Owner has logged in')
               whereNow(owner, resolve)
            } else {
               console.log('A member has logged in?')
               const memberList = project.members.filter(member => member.email === me.email)
               if (memberList.length === 0) {
                  reject('Not in project')
               } else {
                  whereNow(memberList[0], resolve)
               }
            }
         }).catch(err => {
            console.error('Cannot find "' + me.currentProject + '".')
            console.error(err)
            window.location.href = '#/start/' + me.currentProject
            resolve('start')
         })
      } catch (er) {
         console.log(er)
         reject(er)
      }
   })
}

export default service
