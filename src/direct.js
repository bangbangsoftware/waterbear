import router from './router/index.js'
import store from './store.js'
import db from './dbase.js'

const service = (me) => {
   let rtn = 'story'
   try {
      console.log('HOW DO I direct the route????')
      console.log(router)
      console.log(me)
      if (!window) {
         return 'no window'
      }
      if (typeof me.currentProject === 'undefined') {
         window.location.href = '#/start'
         return 'start'
      }
      db.get(me.currentProject).then(project => {
         store.commit('project', project)
         if (project.email.owner.email === me.email) {
            console.log('Owner has logged in')
            window.location.href = '#/story'
         } else {
            console.log('A member ha logged in?')
               // @TODO go through members and see if they are in the project
         }
      }).catch(err => {
         console.error('Cannot find "' + me.currentProject + '".')
         console.error(err)
         window.location.href = '#/start/' + me.currentProject
         rtn = 'start'
      })

      if (typeof me.hours === 'undefined' || me.hours.length === 0) {
         window.location.href = '#/member'
         rtn = 'member'
      } else {}
   } catch (er) {
      console.log(er)
   }
   return rtn
}

export default service
